import { defineTool } from "eve/tools";
import { z } from "zod";
import { glossary } from "../lib/glossary";

export default defineTool({
  description: "Read the team's recorded metric definitions.",
  inputSchema: z.object({}),
  async execute() {
    return glossary.get();
  },
});
