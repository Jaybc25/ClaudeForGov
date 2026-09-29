# ClaudeForGov use case prioritization

Working editorial decision, September 29, 2026. This reviews the user-supplied Perplexity “Top 30” and the later department list against the 52 workflows in the live ClaudeForGov explorer. The department list labels the executive/clerk section “8” but contains nine bullets, so it has **76 named bullets**, not 75. The two supplied lists overlap each other and the live catalog.

## Decision

Keep a broad, searchable catalog, but lead with **16 featured pilot candidates**. Do not turn every source bullet into a card. A case earns its own record when it has a distinct user, source system or artifact, review point, success measure, or deployment risk. Organization and department are tags; Chat, Cowork, Code, and API are delivery routes, and several workflows can have a primary route plus a credible alternative. A product route is never itself an approval for an agency or data class.

Prioritization favors: clear public or staff value; a bounded, measurable pilot; source-grounded outputs; broad applicability or a compelling special-district example; a concrete Claude route; and human review that can be demonstrated. It penalizes unsupported savings claims, unclear ownership, sensitive data dependencies, and high-stakes decisions. The ordering below is editorial judgment, not a measured effectiveness ranking.

## First five pilots

| Priority | Canonical workflow | Starting route | Bounded pilot and measures | Current catalog |
|---|---|---|---|---|
| 1 | Internal policy and SOP navigator | Chat; API only for an agency-owned integration | Approved documents and a fixed question set; time to verified answer, source accuracy, corrections | `policy-guidance` exists |
| 2 | Council/board packet and follow-up | Cowork | Recreate a past packet and action log from cleared files; assembly time, missing items, correction rate | Combine `agenda-packets` and `board-meetings` in the featured story |
| 3 | Grant award obligations and reporting | Cowork | Extract terms from a completed award and draft a historical report; missed obligations, evidence coverage, review time | `grant-compliance` exists; expand the lifecycle |
| 4 | Procurement solicitation drafting | Chat or Cowork | Draft one historical scope and evaluation outline from approved requirements; review time, omissions, revisions | Add a distinct authoring case; `procurement-briefs` covers vendor summaries |
| 5 | Legacy application understanding and tests | Code | Isolated maintenance task in a test repository; reviewed change time, meaningful test coverage, defects | Link `legacy-apps` with `test-coverage` |

These start with internal work and known reference outputs. A public API pilot should follow a separate content, escalation, accessibility, and data review.

## Additional featured candidates

| Priority | Canonical workflow | Starting route | Reason for inclusion | Catalog action |
|---|---|---|---|---|
| 6 | Public-comment synthesis | Chat for small sets; Cowork for document batches | High-volume civic input, with traceability and minority-view checks | Expand `public-comments` with an alternative route; no sentiment claim without evaluation |
| 7 | Budget variance explanation | Chat/Cowork | Reconciled figures and reviewer corrections make a defensible pilot | Add variance case; keep `budget-briefs` for scenario narrative |
| 8 | Public-records response preparation | Cowork | Document-heavy and reviewable; legal disclosure decisions stay with staff | Deepen `records-requests` |
| 9 | Permit application completeness | Cowork, then API if embedded | Missing-item checks can be tested without deciding entitlement | Add; distinct from `permit-status` and `development-review` |
| 10 | Contact-center agent assist | API | Strong service and staff measures without exposing an autonomous public answer | Add; test with historical/de-identified interactions |
| 11 | 311 request routing | API | Measurable assignment accuracy and rework, with emergency escalation | Deepen `request-triage` |
| 12 | Utility customer information | API | A concrete special-district/authority story | Deepen `utility-help`, starting with public content rather than account data |
| 13 | Accessible digital forms | Code | Direct service outcome, testable against accessibility review | Connect `accessible-forms` and `accessibility-remediation` |
| 14 | Data pipeline and reporting modernization | Code | Testable transformations and analyst time; clear engineering ownership | Deepen `data-pipelines` |
| 15 | Public-health plain-language communications | Chat | Broad public value with qualified review and language-access checks | Deepen `health-outreach`; translation is a quality requirement |
| 16 | Resident-service information assistant | API | Recognizable public-facing example, but only after a narrow controlled-content evaluation | Deepen `resident-assistant` |

The featured set covers all four routes and multiple departments without implying that every agency should run every pilot. It is a discovery shortlist, not a recommendation to deploy any case with live data.

## Deduplication of the 76 department bullets

| Source group | Consolidate into a canonical workflow or existing case | Keep distinct or add | Later specialist review |
|---|---|---|---|
| Executive, legislative, clerk (9) | Agenda packet, staff report, minutes/action/decision log form one meeting lifecycle; public-comment synthesis exists | Bill tracking, fiscal notes, and rule comment letters can form a legislative analysis case once evidence is defined | Ordinance/resolution drafting and elected-official constituent casework need legal, records, and boundary review |
| Finance and budget (6) | Budget requests, scenarios, and annual narrative are related to `budget-briefs` | Variance explanation deserves a separate measured case | ACFR narrative, audit corrective action, and rate/fee studies need specialist accuracy and authority checks |
| Procurement and contracts (5) | Vendor summaries map to `procurement-briefs`; obligation/deadline extraction maps to `contract-renewals` | Solicitation authoring and vendor-question/addendum drafting form an authoring workflow distinct from evaluator support | Cooperative vehicle research needs jurisdiction and procurement validation |
| Grants (4) | Narrative drafting exists; award extraction, milestones, and reporting form a compliance lifecycle | Opportunity matching can be a separate development stage if a reliable source feed exists | Do not infer award dollars from draft output alone |
| Records, legal, compliance (5) | Records triage and response map to `records-requests`; accessibility maps to digital forms; plain language is a cross-cutting quality check | Retention/disposition is a separate workflow if records rules are sourced | Legal research and appeal-rights notices require expert review and careful scope |
| Permitting, planning, development (6) | Code navigator maps to `policy-guidance`/`zoning-research`; GIS assistance maps to `asset-map`/Code | Completeness screening and plan-review support differ from public status explanation | Enforcement notices and environmental review need domain-specific validation |
| Inspections and field work (3) | Report drafting and violation/follow-up extraction are stages of `inspection-reports`; SOP search is a policy navigator variant | No extra generic card needed | Retain inspector sign-off and evidence provenance |
| Health and human services (6) | Staff policy navigation, applicant benefits guidance, case packet, and health outreach already have different audiences in the catalog | Housing/homelessness synthesis may warrant a dedicated case after data review | Fair hearings, appeals, eligibility, and sensitive case files need specialist controls and human determinations |
| Public safety/emergency (6) | Exercise briefs and after-action reports form a lower-risk training cycle; public preparedness information exists | Active situation reporting is distinct from exercise work | Live incident response, records/subpoenas, and emergency public alerts need operational and release controls |
| Courts and justice (3) | None should be folded into ordinary resident FAQs | Self-help navigation is a distinct future public-service concept | Filing/docket summaries and correspondence require court rules, privacy, and legal review |
| Constituent services/311 (4) | Resident assistant, 311 routing, and permit status already exist as separate channels | Contact-center agent assist is a real gap | Measure resolution quality alongside handle time or call volume |
| Transportation, works, utilities (6) | CIP narratives map to `capital-projects`; utility help exists; transit comment synthesis is a public-comments variant | Asset/maintenance pattern synthesis and outage/disruption communication can be distinct cases | Title VI service-equity analysis needs a dedicated methodology and civil-rights review |
| Human resources (4) | Training/translation and institutional knowledge capture connect to `training-guides`, `staff-onboarding`, and policy search | Job-description drafting may be a routine later case | Bargaining-agreement interpretation needs labor/legal review |
| Information technology (5) | Legacy modernization, integrations, digital forms, tests, and data pipelines already exist | No additional generic cards | Preserve repository, test, security, and deployment controls |
| Cybersecurity (3) | Vulnerability fixes map to `security-fixes` | Incident summaries/runbooks and authorized alert explanation are distinct from fixing code; service desk assist is another channel | Validate log sensitivity, authorized scope, and response ownership |
| Cross-cutting language access (1) | Tag public-facing cases for language quality and qualified review | Keep `language-access` as a focused evaluation example, not a copy of every translated notice | Avoid assuming machine translation alone establishes compliance or equitable access |

## Proposed catalog changes

1. Add five distinct cards: solicitation authoring, budget variance reporting, permit completeness, contact-center agent assist, and asset/maintenance synthesis. Consider grant opportunity matching after source-feed design.
2. Add `featured` metadata to the 16 candidates and a visible Featured / All catalog control. Keep the full searchable basket; do not replace it with only the shortlist.
3. Support a primary route plus an optional alternative when the same workflow can genuinely be done in staff-directed or embedded form. The detail should explain what changes between routes, including integration and review responsibility.
4. Add a pilot evidence tier to every featured case: illustrative idea, source-supported pattern, or measured case study. The current site should remain in the first tier until individual evidence is attached.
5. Keep outcome claims conditional. For example, measure first-contact resolution and answer accuracy alongside contact volume; measure grant reporting timeliness rather than attributing awards to Claude; treat hours returned as capacity until realization is demonstrated.

## Source and product boundaries

Anthropic describes government opportunities in citizen services, document review/preparation, and policymaking; this supports the broad domains, not this specific ranking. Its Cowork description emphasizes work across selected folders and tools delivered for review, and its connector guidance says connected access inherits user permissions. These do not establish government approval for a given workflow or data type. Product access, commercial terms, security, legal requirements, and procurement must be checked for the actual agency deployment.

- [Anthropic: Expanding Access to Claude for Government](https://www.anthropic.com/news/expanding-access-to-claude-for-government)
- [Anthropic: Claude Cowork](https://www.anthropic.com/product/claude-cowork)
- [Anthropic: Connectors](https://support.anthropic.com/en/articles/11176164-pre-built-web-connectors-using-remote-mcp)
- [Anthropic: Claude Code for State and Local Governments](https://www.anthropic.com/webinars/claude-code-and-public-service-modernizing-how-state-and-local-governments-build-software)
