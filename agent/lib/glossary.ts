import { defineState } from "eve/context";

export interface Glossary {
  readonly terms: Readonly<Record<string, string>>;
}

export const glossary = defineState<Glossary>("analytics.glossary", () => ({
  terms: {},
}));
