<p align="center">
  <img src="https://github.com/OleanderHQ/assets/raw/main/oleander_logo.png" alt="Oleander Logo" width="150" />
</p>

# Give Your Eve Agent a Multi-Engine Data Warehouse

A minimal template for building an [`eve`](https://vercel.com/eve) agent using [`oleander`](https://oleander.dev/). Give your agent its own multi-engine data warehouse. **Any query. Any size. Always the right engine.**

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

8. Ask it something about your data. The first oleander tool call will prompt you to sign in via the browser:
```text
   > What tables do I have access to, and how big is the largest one?
```

## Learn More

- [Introduction](https://docs.oleander.dev/introduction) — what oleander is and how agents fit in the loop
- [Coding with agents](https://docs.oleander.dev/mcp/introduction) — connect via MCP and CLI
- [Skills](https://github.com/OleanderHQ/skills) — reusable agent skills for lake queries, Spark, and Polars
