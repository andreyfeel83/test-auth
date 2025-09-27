import {z} from 'zod';

export const EmailSchema = z.email({message: 'Invalid email address'});

export const PasswordSchema = z
  .string()
  .min(11, {message: 'Password must be at least 11 characters long'})
  .regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
  .regex(/[0-9]/, {message: 'Password must contain at least one number'})

export const AuthSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});
