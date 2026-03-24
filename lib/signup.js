
import * as z from 'zod'
const phoneRegex = /^[0-9+\-\s()]{8,20}$/;

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(50, { message: 'Name must be at most 50 characters long.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    })
    .trim(),
  confirmPassword: z
    .string()
    .min(1, { message: 'Please confirm your password' }),
  telephone: z
    .string()
    .min(8, { message: 'Telephone number must be at least 8 digits' })
    .max(15, { message: 'Telephone number must be at most 15 digits' })
    .regex(phoneRegex, { message: 'Please enter a valid phone number' }),
  role: z
    .enum(['cashier', 'manager'], { 
      message: 'Please select a valid role' 
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});