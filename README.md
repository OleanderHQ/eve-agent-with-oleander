<p align="center">
  <img src="https://github.com/OleanderHQ/assets/raw/main/oleander_logo.png" alt="Oleander Logo" width="150" />
</p>

# Give Your Eve Agent a Multi-Engine Data Warehouse

A minimal template for building an [`eve`](https://vercel.com/eve) agent using [`oleander`](https://oleander.dev/). Give your agent its own multi-engine data warehouse. **Any query. Any size. Always the right engine.**

This repo maps the [Eve Build an Agent tutorial](https://eve.dev/docs/tutorial/query-sample-data) onto oleander: MCP warehouse connection instead of sql.js, lake seed via `init.sql`, sandbox schema + charts, glossary state, team playbooks, and cost-based query approval.

## Getting Started

Click _Deploy_ to clone this repo and create a Vercel project with an eve agent connected to oleander:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOleanderHQ%2Feve-agent-with-oleander&project-name=eve-agent-with-oleander&repository-name=eve-agent-with-oleander)

When it's done, clone the new GitHub repo and start building locally.

## Try it locally

1. Create an [oleander account](https://oleander.dev/account)

2. Browse to [Vercel's marketplace](https://vercel.com/marketplace/oleander) to connect your oleander oleander.

3. Install dependencies:
```bash
   npm install
```

4. Link Vercel:
```bash
   vercel link
```

5. Connect oleander's warehouse:
```bash
   vercel connect create oleander.dev --name oleander
   vercel connect attach oleander.dev/oleander --yes
```

6. Pull down your environment variables:
```bash
   vercel env pull
```

7. Start the agent:
```bash
   npm run dev
```

8. Seed sample tables — the agent reads [`agent/sandbox/workspace/init.sql`](agent/sandbox/workspace/init.sql) (mounted at `/workspace/init.sql`) and runs it via oleander `lake_query`:
```text
   > run init.sql
```

9. Demo prompts (sign in via the browser on the first oleander tool call if needed):
```text
   > Which customer has spent the most, and how much?
   > Plot total order revenue per customer.
   > For us, an active customer is one with a purchase in the last 30 days. Remember that.
   > How many active customers do we have?
   > Total revenue across all customers, all time, broken out by day.
```

The last prompt should trip the cost approval gate (unfiltered scan heuristic). Approve in the TUI to continue.

`chart_series` shells out to `python` + matplotlib in the sandbox. If the plot fails, install matplotlib in sandbox bootstrap or use a custom sandbox image — see [Eve Sandbox](https://eve.dev/docs/sandbox).

### Layout (Eve capabilities → oleander)

| Path | Eve tutorial step | Role |
| --- | --- | --- |
| `agent/connections/oleander.ts` | Connect a warehouse | Oleander MCP + spend `approval` |
| `agent/sandbox/workspace/init.sql` | Query sample data (seed) | Seed SQL at `/workspace/init.sql` — say `run init.sql` |
| `agent/sandbox/workspace/schema.sql` | Run analysis | Reference table shapes |
| `agent/tools/chart_series.ts` | Run analysis | Sandbox matplotlib chart |
| `agent/lib/glossary.ts` + `define_metric` / `recall_metrics` | Remember definitions | Session metric glossary |
| `agent/skills/team-playbook.ts` | Team playbooks | Dynamic Growth/Finance skill |
| `agent/channels/eve.ts` | Team playbooks | Dev-only `team: growth` stamp |
| `agent/lib/cost.ts` | Guard the spend | Scan heuristic + heavy-tool gate |
| `agent/skills/` (lake-*) | | Engine routing for real lake tables |

There is no `agent/tools/run_sql.ts` — SQL goes through the oleander connection.

## Learn More

- [Introduction](https://docs.oleander.dev/introduction) — what oleander is and how agents fit in the loop
- [Coding with agents](https://docs.oleander.dev/mcp/introduction) — connect via MCP and CLI
- [Skills](https://github.com/OleanderHQ/skills) — reusable agent skills for lake queries, Spark, and Polars
- [Eve tutorial](https://eve.dev/docs/tutorial/connect-a-warehouse) — warehouse, analysis, glossary, playbooks, spend gate
