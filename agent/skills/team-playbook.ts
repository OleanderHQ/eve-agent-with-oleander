import { defineDynamic, defineSkill } from "eve/skills";

const PLAYBOOKS: Record<string, { title: string; markdown: string }> = {
  growth: {
    title: "Growth analysis playbook",
    markdown:
      "When analyzing retention, use weekly cohorts anchored on signup/order week, " +
      "report curves not point estimates, and exclude free-plan customers " +
      "(`customers.plan = 'free'`). Prefer oleander `lake_query` for demo-sized " +
      "tables under `oleander.eve_agent_with_oleander`. For larger lake tables, " +
      "`load_skill` **lake-query** and route DuckDB vs Spark by scanned size.",
  },
  finance: {
    title: "Finance analysis playbook",
    markdown:
      "Report revenue as `SUM(amount_cents) / 100.0` (USD dollars) and state the " +
      "currency and grain. When a refunds column exists, report net of refunds. " +
      "Always reconcile against the full date range the user names. Prefer fully " +
      "qualified oleander table names (`oleander.eve_agent_with_oleander.*`).",
  },
};

export default defineDynamic({
  events: {
    "session.started": async (_event, ctx) => {
      const team = ctx.session.auth.current?.attributes.team;
      const key = Array.isArray(team) ? team[0] : team;
      const playbook = key ? PLAYBOOKS[key] : undefined;
      if (!playbook) return null;

      return defineSkill({
        description:
          `Use when answering analysis questions for the ${key} team. ` +
          `Contains that team's standing conventions.`,
        markdown: `# ${playbook.title}\n\n${playbook.markdown}`,
      });
    },
  },
});
