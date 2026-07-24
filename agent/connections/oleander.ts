import { connect } from "@vercel/connect/eve";
import { defineMcpClientConnection } from "eve/connections";

export default defineMcpClientConnection({
  url: process.env.OLEANDER_MCP_URL ?? "https://oleander.dev/mcp",
  description:
    "oleander: managed Iceberg catalog with serverless DuckDB, Spark, Polars, " +
    "and DataFusion compute. Query tables, inspect lineage, and check cost " +
    "and run history for any dataset.",
  auth: connect("oleander.dev/oleander"),
});
