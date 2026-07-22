-- Reference only: table shapes for oleander.eve_agent_with_oleander.*
-- Read before writing demo SQL. Seed data lives in init.sql (run via lake_query).
CREATE TABLE orders    (id INT, customer_id INT, amount_cents INT, created_at DATE);
CREATE TABLE customers (id INT, name TEXT, plan TEXT);
