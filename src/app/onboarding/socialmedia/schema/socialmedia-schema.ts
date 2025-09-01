import z from "zod";

export const socialMediaSchema = z.object({
  socials: z.array(
    z.object({
      label: z.string(),
      value: z.string().optional().or(z.literal("")), // bisa kosong
    })
  ),
});

export type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;
