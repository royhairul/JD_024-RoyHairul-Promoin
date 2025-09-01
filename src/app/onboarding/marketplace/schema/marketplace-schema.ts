import z from "zod";

export const marketplaceSchema = z.object({
  marketplace: z.string().url().optional().or(z.literal("")), // bisa kosong
  sortBy: z.enum(["pop", "ctime", "sales"]).optional(),
});

export type MarketplaceFormValues = z.infer<typeof marketplaceSchema>;
