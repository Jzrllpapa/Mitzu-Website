import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Tell us who you are (2+ characters)"),
  email: z.email("That email doesn't look right"),
  message: z.string().min(10, "A little more detail would be great (10+ characters)").max(500),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
