import { defineTool } from "eve/tools";
import { z } from "zod";
import { glossary } from "../lib/glossary";

export default defineTool({
  description:
    "Record the team's definition of a metric so it persists across turns.",
  inputSchema: z.object({ term: z.string(), meaning: z.string() }),
  async execute({ term, meaning }) {
    glossary.update((g) => ({ terms: { ...g.terms, [term]: meaning } }));
    return glossary.get();
  },
});
