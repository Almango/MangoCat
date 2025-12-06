import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.preprocess((val) => String(val), z.string()), // 显式转换为字符串
    updated: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['zh-CN', 'en']).default('zh-CN'),
    slug: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
