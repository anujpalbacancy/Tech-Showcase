import { z, ZodType } from "zod"; // Add new import

export const UserSchema: ZodType<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }> = z
    .object({
      email: z.string().email('Invalid email address'),
      name: z.string().min(1, { message: "Name is required" }),
      password: z
        .string()
        .min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
          message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  