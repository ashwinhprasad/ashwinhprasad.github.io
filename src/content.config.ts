import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    groups: z.array(z.string()).default([]), // slugs of groups this page belongs to
    references: z.array(z.string()).default([]), // slugs of other pages/groups
    created: z.date(),
    updated: z.date().optional(),
  }),
});

const groups = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    parent: z.string().optional(), // slug of parent group
    subgroups: z.array(z.string()).default([]), // child group slugs
    pages: z.array(z.string()).default([]), // page slugs inside this group
    color: z.string().default("#3B82F6"),
    created: z.date(),
    updated: z.date().optional(),
  }),
});

export const collections = {
  pages,
  groups,
};
