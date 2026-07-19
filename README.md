<p align="center">
  <img src="https://github.com/OleanderHQ/assets/raw/main/oleander_logo.png" alt="Oleander Logo" width="150" />
</p>

# Give Your Eve Agent a Multi-Engine Data Warehouse

A minimal template for building an [`eve`](https://vercel.com/eve) agent using [`oleander`](https://oleander.dev/). **Any query. Any size. Always the right engine.**

## Getting Started

Click _Deploy_ to clone this repo and create a Vercel project with an eve agent connected to oleander:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FOleanderHQ%2Feve-agent-with-oleander&project-name=eve-agent-with-oleander&repository-name=eve-agent-with-oleander)

When it's done, clone the new GitHub repo and start building locally.

## Try it locally

1. Install dependencies:
```bash
   npm install
```

2. Wire up [Vercel Connect](https://vercel.com/docs/connect) for the oleander MCP ([eve warehouse tutorial](https://eve.dev/docs/tutorial/connect-a-warehouse); Connect is in private beta):
```bash
   vercel link
   vercel connect create oleander.dev --name oleander
   vercel connect attach oleander --yes
   vercel env pull
```

   Use the connector UID printed by `create` in `agent/connections/oleander.ts` (`auth: connect("…")`) if it differs from `"oleander"`.

3. Copy `.env.example` into `.env` if you still need local overrides (e.g. `AI_GATEWAY_API_KEY`):
```bash
   cp .env.example .env
```

4. Start the agent:
```bash
   npm run dev
```

5. Ask it something about your data. The first oleander tool call will prompt you to sign in via the browser:
```text
   > What tables do I have access to, and how big is the largest one?
```

## Learn More

- [Introduction](https://docs.oleander.dev/introduction) — what oleander is and how agents fit in the loop
- [Coding with agents](https://docs.oleander.dev/mcp/introduction) — connect via MCP and CLI
- [Skills](https://github.com/OleanderHQ/skills) — reusable agent skills for lake queries, Spark, and Polars
