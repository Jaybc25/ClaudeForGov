const scenarios = {
  policy: {
    index: '01 / 04', symbol: '✳', title: 'Claude Chat',
    purpose: 'For staff who need a thinking partner to research, summarize, and draft while they retain responsibility for the final answer.',
    pilot: 'Test with a small set of approved policy documents and measure time to a verified answer.',
    check: 'Confirm access controls, permitted data, source review, and human approval for consequential responses.'
  },
  casework: {
    index: '02 / 04', symbol: '◈', title: 'Claude tasks (Cowork capability)',
    purpose: 'For teams preparing repeatable deliverables from files and instructions, with a person reviewing every result.',
    pilot: 'Choose one bounded, low-risk document workflow and measure preparation and review time.',
    check: 'Confirm file permissions, connected tools, sensitive data handling, and a clear approval step.'
  },
  software: {
    index: '03 / 04', symbol: '⌘', title: 'Claude Code',
    purpose: 'For developers working in a codebase to understand systems, implement changes, and verify them.',
    pilot: 'Start with an internal maintenance task and compare delivery time and defect rates.',
    check: 'Confirm repository access, secure development practices, testing, and code review ownership.'
  },
  resident: {
    index: '04 / 04', symbol: '◇', title: 'Claude API',
    purpose: 'For an agency-owned application that uses Claude within a designed service experience.',
    pilot: 'Prototype a narrow resident question flow and measure accuracy, escalation, and cost per completed interaction.',
    check: 'Validate data boundaries, accessibility, human escalation, reliability, and the applicable procurement path.'
  }
};

const fields = {
  index: document.getElementById('result-index'),
  symbol: document.getElementById('route-symbol'),
  title: document.getElementById('route-title'),
  purpose: document.getElementById('route-purpose'),
  pilot: document.getElementById('pilot-text'),
  check: document.getElementById('check-text')
};

document.querySelectorAll('[data-scenario]').forEach((button) => {
  button.addEventListener('click', () => {
    const choice = scenarios[button.dataset.scenario];
    if (!choice) return;
    document.querySelectorAll('[data-scenario]').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    for (const [key, node] of Object.entries(fields)) node.textContent = choice[key];
  });
});
