const grid = document.getElementById('case-grid');
const detail = document.getElementById('case-detail');
const search = document.getElementById('case-search');
const org = document.getElementById('org-filter');
const department = document.getElementById('department-filter');
const route = document.getElementById('route-filter');
const count = document.getElementById('result-count');
const featuredButton = document.getElementById('view-featured');
const allButton = document.getElementById('view-all');
const featuredSet = new Set(featuredCaseIds);
const initialParams = new URLSearchParams(location.search);
let selected = initialParams.get('case');
let view = initialParams.get('view') === 'all' || (selected && useCases.some(item => item.id === selected && !featuredSet.has(item.id))) ? 'all' : 'featured';

function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value) node.textContent = value;
  return node;
}

function addOptions(select, options) {
  for (const [value, label] of Object.entries(options)) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.append(option);
  }
}
addOptions(org, organizations);
addOptions(department, departments);
if (organizations[initialParams.get('org')]) org.value = initialParams.get('org');
if (departments[initialParams.get('department')]) department.value = initialParams.get('department');
if (['Chat', 'Cowork', 'Code', 'API'].includes(initialParams.get('route'))) route.value = initialParams.get('route');

function syncUrl(item) {
  const url = new URL(location.href);
  for (const [key, value] of [['org', org.value], ['department', department.value], ['route', route.value]]) {
    if (value === 'all') url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  if (view === 'all') url.searchParams.set('view', 'all');
  else url.searchParams.delete('view');
  if (item) url.searchParams.set('case', item.id);
  else url.searchParams.delete('case');
  history.replaceState(null, '', url);
}

function setDetail(item) {
  selected = item.id;
  syncUrl(item);
  detail.replaceChildren();
  detail.append(element('p', 'detail-kicker', departments[item.department] + ' / ' + item.orgs.map(key => organizations[key]).join(' · ')));
  detail.append(element('h2', '', item.title));
  detail.append(element('p', '', item.summary));
  const box = element('div', 'detail-route');
  box.append(element('span', '', 'Suggested starting route'));
  box.append(element('strong', '', 'Claude ' + item.route));
  detail.append(box);
  for (const [title, value] of [['Pilot to test', item.pilot], ['Measure', item.measure], ['Validate before deployment', item.validate]]) {
    const section = element('div', 'detail-section');
    section.append(element('h3', '', title));
    section.append(element('p', '', value));
    detail.append(section);
  }
  detail.append(element('p', 'detail-disclaimer', 'This route is a planning hypothesis. Confirm product access, commercial terms, data handling, and agency policy before use.'));
  const pilotLink = element('a', 'detail-pilot-link', 'Build a pilot value case ↗');
  pilotLink.href = 'pilot-value.html?case=' + encodeURIComponent(item.id);
  detail.append(pilotLink);
  grid.querySelectorAll('button[data-id]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.id === selected)));
}

function render() {
  const q = search.value.trim().toLowerCase();
  const allMatches = useCases.filter(item =>
    (org.value === 'all' || item.orgs.includes(org.value)) &&
    (department.value === 'all' || item.department === department.value) &&
    (route.value === 'all' || item.route === route.value) &&
    (!q || [item.title, item.summary, departments[item.department], item.route, ...item.orgs.map(key => organizations[key])].join(' ').toLowerCase().includes(q))
  );
  const matches = view === 'featured' ? allMatches.filter(item => featuredSet.has(item.id)) : allMatches;
  if (view === 'featured') matches.sort((a, b) => featuredCaseIds.indexOf(a.id) - featuredCaseIds.indexOf(b.id));
  featuredButton.setAttribute('aria-pressed', String(view === 'featured'));
  allButton.setAttribute('aria-pressed', String(view === 'all'));
  count.textContent = matches.length + (view === 'featured' ? ' featured' : '') + ' use case' + (matches.length === 1 ? '' : 's');
  grid.replaceChildren();
  if (!matches.length) {
    const empty = element('div', 'empty-state');
    empty.append(element('strong', '', 'No matches yet'));
    empty.append(element('span', '', 'Try another combination or clear the filters.'));
    if (view === 'featured' && allMatches.length) {
      const showAll = element('button', 'empty-show-all', 'Search all use cases');
      showAll.type = 'button';
      showAll.addEventListener('click', () => { view = 'all'; render(); });
      empty.append(showAll);
    }
    grid.append(empty);
    detail.replaceChildren(element('p', 'detail-kicker', 'No matching use case'), element('h2', '', 'Try another search'));
    syncUrl(null);
    return;
  }
  for (const item of matches) {
    const card = element('button', 'case-card');
    card.type = 'button';
    card.dataset.id = item.id;
    card.setAttribute('aria-pressed', String(item.id === selected));
    const top = element('div', 'case-card-top');
    top.append(element('span', '', departments[item.department]));
    top.append(element('span', '', 'Claude ' + item.route));
    card.append(top);
    card.append(element('h3', '', item.title));
    card.append(element('p', '', item.summary));
    card.append(element('span', 'case-card-bottom', 'View pilot and validation questions ↗'));
    card.addEventListener('click', () => {
      setDetail(item);
      if (window.matchMedia('(max-width: 950px)').matches) detail.scrollIntoView({behavior:'smooth', block:'start'});
    });
    grid.append(card);
  }
  setDetail(matches.find(item => item.id === selected) || matches[0]);
}

search.addEventListener('input', render);
featuredButton.addEventListener('click', () => { view = 'featured'; render(); });
allButton.addEventListener('click', () => { view = 'all'; render(); });
org.addEventListener('change', render);
department.addEventListener('change', render);
route.addEventListener('change', render);
document.getElementById('clear-filters').addEventListener('click', () => {
  search.value = '';
  org.value = 'all';
  department.value = 'all';
  route.value = 'all';
  render();
  search.focus();
});
render();
