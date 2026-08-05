import { z } from 'zod';

/**
 * Shared by CheckoutModal and StarterSignupModal — both collect the same
 * fields with the same rules before handing off to their respective APIs.
 */
export const userDetailsSchema = z.object({
  firstName: z.string().trim().min(1, 'Required'),
  lastName: z.string().trim().min(1, 'Required'),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Valid email required'),
  company: z.string().trim().min(1, 'Required'),
  phone: z.string().optional(),
});

export type UserDetails = z.infer<typeof userDetailsSchema>;
