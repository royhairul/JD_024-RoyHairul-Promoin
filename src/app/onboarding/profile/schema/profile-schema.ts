import z from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  username: z.string().min(1, "Username wajib diisi"),
  bio: z.string().min(1, "Nama wajib diisi"),
  color: z
    .string()
    .regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Format warna tidak valid"),
});
