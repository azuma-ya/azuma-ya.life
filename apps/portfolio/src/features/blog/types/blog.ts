import { z } from "zod";

import { dateSchema } from "@/schema/date";

const baseBlogSchema = z.object({
  title: z.string(),
  createdAt: dateSchema,
  updatedAt: dateSchema.optional(),
  tags: z.array(z.string()),
  categories: z.array(z.string()),
});

export const externalBlogSchema = baseBlogSchema.and(
  z.object({
    url: z.string(),
    type: z.literal("ExternalBlog"),
  }),
);

export const internalBlogSchema = baseBlogSchema.and(
  z.object({
    description: z.string(),
    slug: z.string(),
    content: z.string(),
    type: z.literal("InternalBlog"),
  }),
);

export const blogSchema = z.union([externalBlogSchema, internalBlogSchema]);

export type ExternalBlog = z.infer<typeof externalBlogSchema>;
export type InternalBlog = z.infer<typeof internalBlogSchema>;
export type Blog = z.infer<typeof blogSchema>;
