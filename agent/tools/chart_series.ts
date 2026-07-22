import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description:
    "Plot a time series to a PNG in the workspace. Pass {date, value} points; " +
    "returns the chart path.",
  inputSchema: z.object({
    title: z.string(),
    points: z.array(z.object({ date: z.string(), value: z.number() })),
  }),
  async execute({ title, points }, ctx) {
    const sandbox = await ctx.getSandbox();
    await sandbox.writeTextFile({
      path: "analysis/series.json",
      content: JSON.stringify({ title, points }),
    });
    await sandbox.writeTextFile({
      path: "analysis/plot.py",
      content: [
        "import json, matplotlib",
        "matplotlib.use('Agg')",
        "import matplotlib.pyplot as plt",
        "d = json.load(open('series.json'))",
        "plt.plot([p['date'] for p in d['points']], [p['value'] for p in d['points']])",
        "plt.title(d['title']); plt.savefig('chart.png')",
      ].join("\n"),
    });
    const root = sandbox.resolvePath("analysis");
    await sandbox.run({ command: `cd ${JSON.stringify(root)} && python plot.py` });
    return { chart: `${root}/chart.png` };
  },
});
