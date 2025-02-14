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

export const emailSchema = z.object({
  email: z.string().email(),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(3, { message: "Password must contain at least 3 character(s)" })
      .max(30, { message: "Password must contain max 30 character(s)" }),
    confirmPassword: z
      .string()
      .min(3, {
        message: "Confirm password must contain at least 3 character(s)",
      })
      .max(30, {
        message: "Confirm password must contain max 30 character(s)",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
