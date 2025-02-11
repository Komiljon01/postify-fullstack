import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must contain at least 5 character(s)" }),
  body: z
    .string()
    .min(15, { message: "Body must contain at least 15 character(s)" }),
});
