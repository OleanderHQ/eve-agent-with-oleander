import { defineDynamic, defineSkill } from "eve/skills";
const PLAYBOOKS: Record<string, { title: string; markdown: string }> = {
  growth: {
    title: "Growth analysis playbook",
    markdown:
      "When analyzing retention, use weekly cohorts anchored on signup week, " +
      "report curves not point estimates, and exclude trial accounts.",
  },
  finance: {
    title: "Finance analysis playbook",
    markdown:
      "Report revenue net of refunds and recognized over the subscription term. " +
      "Always reconcile against the close-of-month snapshot.",
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