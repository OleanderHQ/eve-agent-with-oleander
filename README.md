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

2. Copy `.env.example` to `.env` and add your oleander API key:
```bash
   cp .env.example .env
```

3. Start the agent:
```bash
   npm run dev
```

4. Ask it something about your data:
```text
   > What tables do I have access to, and how big is the largest one?
```

## Learn More

- [Introduction](https://docs.oleander.dev/introduction) — what oleander is and how agents fit in the loop
- [Coding with agents](https://docs.oleander.dev/mcp/introduction) — connect via MCP and CLI
- [Skills](https://github.com/OleanderHQ/skills) — reusable agent skills for lake queries, Spark, and Polars
