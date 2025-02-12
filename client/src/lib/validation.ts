import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must contain at least 5 character(s)" }),
  body: z
    .string()
    .min(15, { message: "Body must contain at least 15 character(s)" }),
});

export const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 character(s)" })
    .max(30, { message: "Password must contain max 30 character(s)" }),
});
