# Revenue OS: a 29-agent GTM and RevOps team

<img src="assets/team.png" width="100%" alt="Ricardo Oliveira and the agent team">

I'm Ricardo Oliveira, an AI operator. I'm not a developer, I'm a builder: I design how the work should run, then build the agents and automations that run it, with Claude, Claude Code, n8n and LLM APIs.

This repo is the generic version of the AI team I run as one GTM and RevOps department: **29 agents in 7 squads, 82 method skills.** I first built it to deliver the output of an entire extra department on top of a team of six people. Some agents are fully built and tested on real companies; others have their job written and their skills on the roadmap. The status column says which.

## How it works

- **Every agent is written like a job, not a prompt.** Each `AGENT.md` holds the role, mission, what it reads, its intake questions, the skills it uses, the one output it produces and who uses that output.
- **Skills load only when the task needs them.** An agent's method lives in `skills/*/SKILL.md`. A run reads one `AGENT.md`, the shared intake skill and only the handful of skills that task needs, never the whole library, so one agent's method never leaks into another's work.
- **One task, one output file.** Every analysis and critique done for a task goes into that task's single deliverable or the run log. Reruns update the same file.
- **The Analyst grades everyone.** One agent owns the numbers and grades every other agent's output against its KPI, so a weak agent gets fixed before it costs the business.
- **Agents are generic, companies are instances.** Nothing here names a company. Targets, rubrics and pilot findings live in each company's own overlay, because what holds in one industry or country rarely holds in another. Tools like n8n, Apify and Sales Navigator are named, since they are the providers the system runs on.

Run an agent with: *"Run {agent} for {company}: {task}"*. The agent starts with [agent intake](_shared/skills/agent-intake/SKILL.md), which detects how much evidence exists, reads before asking, and interviews the operator only on the gaps.

## The team

| | Agent | Squad | Job | Status |
|---|---|---|---|---|
| <img src="chief-of-staff/assets/Chief%20of%20Staff.png" width="48"> | [Chief of Staff](chief-of-staff/AGENT.md) | Command | Runs the operator's day and the team's rituals | Job written, skills planned |
| <img src="analyst/assets/Analyst.png" width="48"> | [Analyst](analyst/AGENT.md) | Command | The one source of numbers and the grader of every agent | Job written, skills planned |
| <img src="market-and-customer-intel/assets/Market%20and%20Customer%20Intel.png" width="48"> | [Market and Customer Intel](market-and-customer-intel/AGENT.md) | Strategy | Owns the ICP and the market picture | 30 skills built: 11 tested on a real company, 12 partly tested |
| <img src="product-marketing/assets/Product%20Marketing.png" width="48"> | [Product Marketing](product-marketing/AGENT.md) | Strategy | Owns positioning, messaging and pricing | 3 skills built: 3 tested on a real company |
| <img src="call-intelligence/assets/Call%20Intelligence.png" width="48"> | [Call Intelligence](call-intelligence/AGENT.md) | Strategy | Mines every recorded sales call | Job written, skills planned |
| <img src="launch-and-pr/assets/Launch%20and%20PR.png" width="48"> | [Launch and PR](launch-and-pr/AGENT.md) | Strategy | Takes releases and news outside the building | Job written, skills planned |
| <img src="signal-watcher/assets/Signal%20Watcher.png" width="48"> | [Signal Watcher](signal-watcher/AGENT.md) | Outbound | Timing score; watches approved companies for reasons to reach out now | 3 skills built: 1 tested on a real company, 1 partly tested |
| <img src="list-builder/assets/List%20Builder.png" width="48"> | [List Builder](list-builder/AGENT.md) | Outbound | Builds the company repository by monthly slice and draws the weekly batch | 9 skills built: 8 tested on a real company |
| <img src="company-scorer/assets/Company%20Scorer.png" width="48"> | [Company Scorer](company-scorer/AGENT.md) | Outbound | Scores company fit (ICP), approves or blocks spend; timing is Signal Watcher's | 4 skills built: 4 tested on a real company |
| <img src="decision-maker-finder/assets/Decision%20Maker%20Finder.png" width="48"> | [Decision Maker Finder](decision-maker-finder/AGENT.md) | Outbound | Finds the people inside approved companies | 5 skills built |
| <img src="decision-maker-scorer/assets/Decision%20Maker%20Scorer.png" width="48"> | [Decision Maker Scorer](decision-maker-scorer/AGENT.md) | Outbound | Approves people once for every channel | Job written, skills planned |
| <img src="email-copywriter/assets/Email%20Copywriter.png" width="48"> | [Email Copywriter](email-copywriter/AGENT.md) | Outbound | Writes the email sequence | Job written, skills planned |
| <img src="linkedin-copywriter/assets/LinkedIn%20Copywriter.png" width="48"> | [LinkedIn Copywriter](linkedin-copywriter/AGENT.md) | Outbound | Writes the DM sequence | Job written, skills planned |
| <img src="call-script-specialist/assets/Call%20Script%20Specialist.png" width="48"> | [Call Script Specialist](call-script-specialist/AGENT.md) | Outbound | Writes call scripts and voicemails | Job written, skills planned |
| <img src="cold-email-operator/assets/Cold%20Email%20Operator.png" width="48"> | [Cold Email Operator](cold-email-operator/AGENT.md) | Outbound | Runs the email sender | Job written, skills planned |
| <img src="linkedin-outbound-operator/assets/LinkedIn%20Outbound%20Operator.png" width="48"> | [LinkedIn Outbound Operator](linkedin-outbound-operator/AGENT.md) | Outbound | Runs the LinkedIn sender | Job written, skills planned |
| <img src="cold-calling-operator/assets/Cold%20Calling%20Operator.png" width="48"> | [Cold Calling Operator](cold-calling-operator/AGENT.md) | Outbound | Runs the dial list | Job written, skills planned |
| <img src="founder-voice/assets/Founder%20Voice.png" width="48"> | [Founder Voice](founder-voice/AGENT.md) | Owned demand | The founder's LinkedIn and X | Job written, skills planned |
| <img src="company-social/assets/Company%20Social.png" width="48"> | [Company Social](company-social/AGENT.md) | Owned demand | Company LinkedIn and Instagram | Job written, skills planned |
| <img src="content-seo-and-ai-search/assets/Content,%20SEO%20and%20AI%20Search.png" width="48"> | [Content, SEO and AI Search](content-seo-and-ai-search/AGENT.md) | Owned demand | Long-form for humans and for machines | 13 skills built: 1 partly tested |
| <img src="web-and-cro/assets/Web%20and%20CRO.png" width="48"> | [Web and CRO](web-and-cro/AGENT.md) | Owned demand | The website as a conversion machine | 8 skills built: 1 tested on a real company, 4 partly tested |
| <img src="reviews-and-mentions/assets/Reviews%20and%20Mentions.png" width="48"> | [Reviews and Mentions](reviews-and-mentions/AGENT.md) | Owned demand | Third-party presence | Job written, skills planned |
| <img src="paid-media/assets/Paid%20Media.png" width="48"> | [Paid Media](paid-media/AGENT.md) | Paid demand | Runs the ad accounts | Job written, skills planned |
| <img src="creative-studio/assets/Creative%20Studio.png" width="48"> | [Creative Studio](creative-studio/AGENT.md) | Paid demand | Makes the assets | Job written, skills planned |
| <img src="partnerships/assets/Partnerships.png" width="48"> | [Partnerships](partnerships/AGENT.md) | Revenue | Co-marketing, creators, referrals, integrations | Job written, skills planned |
| <img src="deal-desk/assets/Deal%20Desk.png" width="48"> | [Deal Desk](deal-desk/AGENT.md) | Revenue | Supports the human sellers from reply to close | Job written, skills planned |
| <img src="lifecycle/assets/Lifecycle.png" width="48"> | [Lifecycle](lifecycle/AGENT.md) | Revenue | The customer after the sale | Job written, skills planned |
| <img src="systems-engineer/assets/Systems%20Engineer.png" width="48"> | [Systems Engineer](systems-engineer/AGENT.md) | Foundation | Builds and keeps the plumbing | 1 skill built: 1 partly tested |
|  | [Brand Designer](brand-designer/AGENT.md) | Foundation | Owns the visual identity and designs pages and collaterals | 5 skills built: 3 tested on a real company, 1 partly tested |

## Read more

- [The Revenue OS framework](docs/revenue-os.md): the operating system the agents serve.
- [The squad roster](docs/revenue-os-squads.md): every agent's role, mission, skills, output and who it feeds.

Built and maintained by [Ricardo Oliveira](https://www.linkedin.com/in/ricatroliveira).
