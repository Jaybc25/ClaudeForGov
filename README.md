# ClaudeForGov

An independent JayAI project exploring where Claude could help government teams improve services, expand staff capacity, and evaluate costs and measurable outcomes. [View the live site](https://claude-for-gov.vercel.app/).

## Current experience

- A public, no-login homepage introduces four possible routes: Claude Chat, Cowork, Code, and API.
- The [Use Case Explorer](https://claude-for-gov.vercel.app/use-cases.html) leads with 16 featured pilot candidates and offers all 57 illustrative workflows one click away. Visitors can search and filter by organization type, department or function, and suggested Claude route. Each case includes a bounded pilot, proposed measures, and deployment questions.
- The [Models & API Cost](https://claude-for-gov.vercel.app/models.html) page compares four Claude models and estimates direct API token charges from editable input tokens, output tokens, and monthly request volume. Standard USD base prices and model specifications were checked against Anthropic documentation on September 29, 2026. Rates are stored in `models.js` and should be checked before budget use.
- The catalog uses one record per workflow, tagged for multiple relevant organizations. Its organization types are practical browsing categories, not a legal classification of a particular entity. Department labels are broad functions; agency structures vary.

The [use case prioritization review](USE_CASE_PRIORITIZATION.md) compares additional user-supplied ideas with the original 52-case catalog and explains the featured shortlist. Five distinct workflows from that review have since been added. The Featured control is live; source-supported evidence tiers and alternate-route explanations remain future work.

The explorer is a working planning catalog. Route assignments and organization fit are hypotheses for discovery, not evidence of agency adoption, product eligibility, security authorization, or measured results. Some problem areas were informed by JayAI's separate inventory, but NVIDIA-specific descriptions, blueprint implementation details, product links, and infrastructure recommendations were not copied.

## Planned experience

1. **Explore a use case.** Identify the workflow, current effort, audience, and desired outcome.
2. **Choose a Claude route.** Compare Chat, Cowork, Code, and API based on who performs the work and how it is delivered.
3. **Estimate cost.** The direct API token estimator is live. Other routes require their own plan or enterprise cost methods.
4. **Estimate value and plan a pilot.** Show editable baseline, implementation, capacity, service quality, and realization assumptions. Keep negative outcomes visible.

ROI and non-API route costing remain planned. The current API estimate excludes implementation and operating costs, pricing modifiers, and actual workload variability. Content needs case-by-case evidence, product review, and public-sector subject-matter review before it can support a deployment decision.

## Independence and limitations

ClaudeForGov is a personal project and is not affiliated with or endorsed by Anthropic. It is not an official procurement, security, legal, or policy assessment. Product access, pricing, data handling, and agency requirements must be verified for each deployment.
