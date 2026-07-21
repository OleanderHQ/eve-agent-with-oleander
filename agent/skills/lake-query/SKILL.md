---
description: "Routes lake SQL by scanned data size: lake_query (DuckDB) under 50 GB, spark_sql_submit at or above 50 GB. Use when querying oleander lake tables, exploring data, sizing partitions, or choosing between DuckDB and Spark SQL."
---
# Lake Query

Check how much data the query will actually read, then route to the
correct engine.

## Choose the right query engine for the right data

For each table the query reads:

1. Call `catalogs_tables_metadata_get` with `catalog: oleander`,
   `namespace: default`, and the table name unless the user specifies
   otherwise, to get schema and the partition spec.
2. From the SQL, identify WHERE clause predicates on partition columns.
   If partition filtering cannot be determined, use the full-table size
   as a conservative estimate.
3. Call `catalogs_tables_size_get` with the same `catalog`, `namespace`,
   and `table`. If the query targets specific partitions, pass
   `partition_filters` as `[{ key, value }]` to return the size for
   only those partitions. Otherwise use the full-table `sizeBytes`.
4. Parse `sizeBytes` (returned as a string) and compare to 50 GB.

- **Under 50 GB** → run with `lake_query` (DuckDB)
- **50 GB or above** → run as a Spark SQL job (see **Large tables** below)

A table can be large overall but small for a filtered query when it is
partitioned — always size the partitions the query actually touches,
not the whole table.

When joining multiple tables, route to Spark if any one table's relevant
read size is at or above 50 GB.

Tell the user which engine was chosen and the size that drove it.

Use `lake_query` for cheap SQL metadata reads (`DESCRIBE`,
`information_schema`) regardless of table size. Prefer
`catalogs_tables_metadata_get` when you also need the partition spec.

## Small tables (under 50 GB)

1. Confirm schema if needed: `catalogs_tables_metadata_get` or
   `DESCRIBE <table>` via `lake_query`
2. Write and run the SQL via `lake_query`

## Large tables (50 GB and above)

1. Confirm schema if needed: `catalogs_tables_metadata_get` or
   `DESCRIBE <table>` via `lake_query`
2. Write standard Spark SQL only — no PySpark, no DataFrame API
3. Submit via `spark_sql_submit` with `namespace`, `name`, `query`,
   `output_table`, and `confirm: true`. For ad hoc exploration, use a
   temporary output table and `write_mode: OVERWRITE`.
4. Monitor with `jobs_runs_get` using the returned `run_id`
5. After the run completes, sample results with `lake_query` against
   `output_table`

`spark_sql_submit` does not return query rows — results land in
`output_table`.

**Not supported in Spark SQL:**
- `QUALIFY` — rewrite as subquery with `WHERE`
- `EXCLUDE` in `SELECT` — list columns explicitly
- `TRY_CAST` — use `CAST` with `TRY` separately
- `strftime` — use `DATE_FORMAT(col, 'yyyy-MM-dd')`
- `STRING_AGG` — use `COLLECT_LIST` or `GROUP_CONCAT`
