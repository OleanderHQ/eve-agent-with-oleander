/**
 * Cost heuristics for gating oleander connection tool calls.
 * Prefer catalogs_tables_size_get / lake-query skill when available;
 * this SQL heuristic matches the Eve tutorial's unfiltered-scan demo.
 */
export const THRESHOLD_GB = 50;

/** Illustrative: unfiltered scans are treated as expensive. */
export function estimateScanGb(sql: string): number {
  return /\bwhere\b/i.test(sql) ? 1 : 200;
}

const HEAVY_TOOL_RE =
  /spark_sql_submit|spark_submit|submit_spark|polars.*distributed|jobs_submit/i;

const LAKE_QUERY_RE = /lake_query|query_lake/i;

export function extractSql(toolInput: unknown): string {
  if (!toolInput || typeof toolInput !== "object") return "";
  const input = toolInput as Record<string, unknown>;
  for (const key of ["sql", "query", "statement"]) {
    const value = input[key];
    if (typeof value === "string") return value;
  }
  return "";
}

/** True when this connection tool should park for user approval. */
export function needsSpendApproval(toolName: string, toolInput?: unknown): boolean {
  if (HEAVY_TOOL_RE.test(toolName)) return true;
  if (!LAKE_QUERY_RE.test(toolName)) return false;
  return estimateScanGb(extractSql(toolInput)) > THRESHOLD_GB;
}
