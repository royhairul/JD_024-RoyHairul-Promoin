import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
