import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/),
    language: z.string(),
    license: z.string(),
    category: z.enum(["Tool", "Agent skill", "Design system"]),
  }),
});
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    type: z.enum(["Note", "Article", "Experiment"]).default("Note"),
    tags: z.array(z.string()).default([]),
  }),
});
export const collections = { projects, blog };
