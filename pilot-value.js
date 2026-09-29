"use strict";

const params = new URLSearchParams(location.search);
const byId = (id) => document.getElementById(id);
const fields = ["volume", "baseline", "assisted", "realization", "hourly", "operating", "api-cost", "implementation"];
const evidenceFields = ["quality-metric", "quality-baseline", "quality-pilot", "quality-threshold", "quality-notes"];
const example = { volume: 250, baseline: 20, assisted: 14, realization: 50, hourly: 60, operating: 400, "api-cost": 0, implementation: 10000 };
const currency = (number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(number);
const number = (value, places = 0) => new Intl.NumberFormat("en-US", { maximumFractionDigits: places }).format(value);
const html = (id, value) => { byId(id).textContent = value; };
const selectedId = params.get("case");
const importedCost = Number(params.get("apiMonthly"));
let pendingImport = params.has("apiMonthly") && Number.isFinite(importedCost) && importedCost >= 0 && importedCost <= 100000000 ? { cost: importedCost, model: params.get("model") } : null;
let activeKey = null;
let currentApiModel = null;

for (const item of useCases) {
  const option = document.createElement("option");
  option.value = item.id;
  option.textContent = item.title;
  byId("case-select").append(option);
}
if (useCases.some((item) => item.id === selectedId)) byId("case-select").value = selectedId;

function updateApiNote() {
  html("api-note", currentApiModel ? `Imported direct API token estimate (${currentApiModel}). Verify rates and add integration, hosting, support, and review costs separately.` : "Enter direct API token cost only for an API implementation. Include plan, hosting, support, and review costs in the other recurring field.");
}

function loadScenario(key) {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(key) || "null"); } catch { /* Local storage can be unavailable. */ }
  for (const id of fields) {
    const field = byId(id);
    field.value = String(example[id]);
    const candidate = saved?.values?.[id];
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      field.value = String(candidate);
      if (!field.validity.valid) field.value = String(example[id]);
    }
  }
  for (const id of evidenceFields) byId(id).value = typeof saved?.evidence?.[id] === "string" ? saved.evidence[id].slice(0, byId(id).maxLength) : "";
  currentApiModel = typeof saved?.apiModel === "string" && /^[a-z0-9 .-]{1,40}$/i.test(saved.apiModel) ? saved.apiModel : null;
  if (pendingImport) {
    byId("api-cost").value = pendingImport.cost.toFixed(2);
    currentApiModel = pendingImport.model && /^[a-z0-9 .-]{1,40}$/i.test(pendingImport.model) ? pendingImport.model : null;
    pendingImport = null;
    const clean = new URL(location.href);
    clean.searchParams.delete("apiMonthly");
    clean.searchParams.delete("model");
    history.replaceState(null, "", clean);
  }
  updateApiNote();
}

function saveScenario() {
  if (!readValues()) return;
  const values = Object.fromEntries(fields.map((id) => [id, Number(byId(id).value)]));
  const evidence = Object.fromEntries(evidenceFields.map((id) => [id, byId(id).value]));
  try {
    localStorage.setItem(activeKey, JSON.stringify({ values, evidence, apiModel: currentApiModel }));
    html("save-status", "Saved in this browser for this use case. Use aggregate measures; avoid protected case details.");
  } catch {
    html("save-status", "Local saving is unavailable in this browser. Keep a separate copy of your pilot notes.");
  }
}

function showCase() {
  const item = useCases.find((entry) => entry.id === byId("case-select").value);
  const key = "claudeforgov-pilot-v1:" + (item?.id || "general");
  if (activeKey !== key) { activeKey = key; loadScenario(key); }
  html("context-title", item ? item.title : "Illustrative general workflow");
  html("context-summary", item ? item.summary : "Select a workflow from the explorer or pick one here. The example inputs remain unchanged until you measure this workflow.");
  showRoute(item);
  html("pilot-text", item ? item.pilot : "Choose a representative, bounded workflow with cleared material and a human reviewer.");
  html("measure-text", item ? item.measure : "Staff time including review; completeness; corrections; service outcome.");
  html("validate-text", item ? item.validate : "Data permissions, source quality, accessibility, human approval, and agency policy.");
  const caseUrl = new URL("use-cases.html", location.href);
  if (item) caseUrl.searchParams.set("case", item.id);
  byId("case-link").href = caseUrl;
  const modelUrl = new URL("models.html", location.href);
  if (item) modelUrl.searchParams.set("case", item.id);
  byId("api-link").href = modelUrl;
  const pageUrl = new URL(location.href);
  if (item) pageUrl.searchParams.set("case", item.id);
  else pageUrl.searchParams.delete("case");
  history.replaceState(null, "", pageUrl);
  render();
  saveScenario();
}

function showRoute(item) {
  const alternate = item && item.route !== "API" && Number(byId("api-cost").value) > 0;
  html("context-route", item ? `Suggested starting route: Claude ${item.route}${alternate ? ". An API token cost is entered, so this estimate assumes an alternate API implementation." : ""}` : "No route selected");
}

function readValues() {
  if (fields.some((id) => !byId(id).validity.valid || byId(id).value.trim() === "")) return null;
  const values = Object.fromEntries(fields.map((id) => [id, Number(byId(id).value)]));
  if (Object.values(values).some((value) => !Number.isFinite(value))) return null;
  return values;
}

function calculate(value) {
  const grossMonthlyHours = (value.baseline - value.assisted) * value.volume / 60;
  // A slower assisted workflow retains its full time penalty; the factor applies only to time returned.
  const monthlyCapacityHours = grossMonthlyHours >= 0 ? grossMonthlyHours * value.realization / 100 : grossMonthlyHours;
  const annualCapacityHours = monthlyCapacityHours * 12;
  const annualCapacityValue = annualCapacityHours * value.hourly;
  const monthlyRecurringCost = value.operating + value["api-cost"];
  const annualRecurringCost = monthlyRecurringCost * 12;
  const threeYearCost = value.implementation + annualRecurringCost * 3;
  const threeYearNet = annualCapacityValue * 3 - threeYearCost;
  const roi = threeYearCost > 0 ? threeYearNet / threeYearCost * 100 : null;
  const monthlyNet = annualCapacityValue / 12 - monthlyRecurringCost;
  const payback = monthlyNet > 0 ? value.implementation / monthlyNet : null;
  return { annualCapacityHours, annualCapacityValue, annualRecurringCost, threeYearNet, roi, payback };
}

function render() {
  const value = readValues();
  showRoute(useCases.find((entry) => entry.id === byId("case-select").value));
  byId("form-error").hidden = Boolean(value);
  html("form-error", value ? "" : "Enter nonnegative values within each field’s limits. The realization factor must be between 0% and 100%.");
  if (!value) {
    for (const id of ["net-value", "hours", "annual-value", "annual-cost", "initial-cost", "roi", "payback"]) html(id, "—");
    return;
  }
  const result = calculate(value);
  html("net-value", currency(result.threeYearNet));
  html("net-qualifier", result.threeYearNet < 0 ? "Negative modeled net capacity value after costs" : "Capacity value proxy after modeled costs, not cash savings");
  byId("net-value").classList.toggle("negative", result.threeYearNet < 0);
  html("hours", `${number(result.annualCapacityHours, 1)} hours`);
  html("annual-value", currency(result.annualCapacityValue));
  html("annual-cost", currency(result.annualRecurringCost));
  html("initial-cost", currency(value.implementation));
  html("roi", result.roi === null ? "N/A (no modeled cost)" : `${number(result.roi)}%`);
  html("payback", result.payback === null ? "No payback" : result.payback === 0 ? "Immediate*" : `${number(Math.ceil(result.payback))} months`);
  html("math-summary", `(${number(value.baseline, 1)} − ${number(value.assisted, 1)}) minutes × ${number(value.volume)} units/month ÷ 60 × 12${value.baseline >= value.assisted ? ` × ${number(value.realization)}% realization` : " (full time penalty)"} = ${number(result.annualCapacityHours, 1)} annual capacity hours. At ${currency(value.hourly)}/hour, that is ${currency(result.annualCapacityValue)} annual capacity value. Three-year net = 3 × annual capacity value − 3 × ${currency(result.annualRecurringCost)} recurring cost − ${currency(value.implementation)} implementation. ${result.payback === 0 ? "*No implementation cost; recurring costs are still included." : ""}`);
}

byId("case-select").addEventListener("change", showCase);
byId("pilot-form").addEventListener("input", (event) => {
  if (event.target.id === "api-cost") { currentApiModel = null; updateApiNote(); }
  render();
  saveScenario();
});
byId("pilot-form").addEventListener("submit", (event) => event.preventDefault());
for (const id of evidenceFields) byId(id).addEventListener("input", saveScenario);
byId("reset-example").addEventListener("click", () => {
  for (const [id, value] of Object.entries(example)) byId(id).value = value;
  currentApiModel = null;
  updateApiNote();
  render();
  saveScenario();
});
showCase();
