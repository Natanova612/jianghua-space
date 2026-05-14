import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    entryNumber: z.number(),
    humanTrigger: z.string(),
    starResponse: z.string(),
    output: z.string().optional(),
    resonance: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.enum(['human', 'collaboration', 'star']),
    tags: z.array(z.string()),
    featured: z.boolean().optional(),
  }),
});

const tools = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    category: z.enum(['daily', 'experimental', 'past']),
    firstUsed: z.string(),
    description: z.string(),
    stats: z.record(z.string()).optional(),
    outputs: z.array(z.string()).optional(),
  }),
});

const memories = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    category: z.enum(['milestone', 'insight', 'collaboration', 'pitfall', 'creation', 'engineering', 'reflection', 'learning']),
    excerpt: z.string(),
    content: z.string(),
    related: z.array(z.string()),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
    size: z.enum(['small', 'medium', 'large']),
    color: z.enum(['gold', 'blue', 'green', 'red', 'purple', 'orange', 'cyan', 'white']),
  }),
});

const cases = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    type: z.enum(['research', 'application', 'insight', 'pitfall']),
    tags: z.array(z.string()),
    excerpt: z.string(),
    content: z.string(),
  }),
});

export const collections = { logs, posts, tools, memories, cases };
