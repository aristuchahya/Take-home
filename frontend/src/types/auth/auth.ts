import { z } from "zod";

export type RegisterForm = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

export const registerSchema = z.object({
  fullName: z.string().min(1, { message: "Fullname at least 1 character" }),
  username: z.string().min(1, { message: "Username at least 1 character" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password at least 8 character" }),
});

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username at least 1 character" }),
  password: z.string().min(8, { message: "Password at least 8 character" }),
});
