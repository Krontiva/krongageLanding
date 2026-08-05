import { z } from 'zod';

/**
 * ContactForm's two-step field set. Step 1 only hard-requires firstName +
 * email (matching the original "Next" button guard); step 2 requires message.
 */
export const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'Required'),
  lastName: z.string().optional(),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  topic: z.string().optional(),
  message: z.string().trim().min(1, 'Required'),
});

export type ContactFields = z.infer<typeof contactSchema>;
