import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: process.env.OLEANDER_MCP_URL ?? "https://oleander.dev/mcp",
  description:
    "oleander: Multi-engine data warehouse for agents and builders. Any query. Any size. Always the right engine.",
  auth: connect("oleander.dev/oleander"),
});
