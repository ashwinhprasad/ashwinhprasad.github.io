import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    belongsTo: z.discriminatedUnion("type", [
      z.object({
        type: z.literal("groups"),
        groups: z.array(z.string()), // can belong to multiple groups
      }),
      z.object({
        type: z.literal("series"),
        series: z.string(), // must belong to exactly one series
      }),
    ]),
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


const series = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pages: z.array(z.string()), // ordered list of page slugs
    groups: z.array(z.string()).default([]), // series may belong to groups
    coverImage: z.string().optional(), // optional, e.g. thumbnail or banner
    created: z.date(),
    updated: z.date().optional(),
  }),
});


export const collections = {
  pages,
  groups,
  series
};
