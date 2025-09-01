import z from "zod";

export const siteSchema = z
  .object({
    cta_text: z.string().min(1, "Teks CTA wajib diisi"),
    cta_link: z.string().min(1, "Pilih platform"),
    template: z.string().min(1, "Pilih template"),
    platform: z.string(),
    customPlatform: z.string().optional(),
  })
  .refine(
    (data) =>
      data.platform !== "custom" ||
      (data.customPlatform && data.customPlatform.length > 0),
    {
      message: "Link custom wajib diisi",
      path: ["customPlatform"],
    }
  );

// ✅ Type otomatis dari schema
export type SiteFormValues = z.infer<typeof siteSchema>;
