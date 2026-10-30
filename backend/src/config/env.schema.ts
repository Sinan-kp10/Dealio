import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce
    .number()
    .int()
    .min(1, "PORT must be at least 1")
    .max(65535, "PORT must be at most 65535")
    .default(5000),

  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required"),
  DIRECT_URL: z.string().optional(),

  REDIS_URL: z.string().default("redis://localhost:6379"),

  SMTP_USER: z
    .string()
    .min(1, "SMTP_USER is required"),
  SMTP_PASS: z
    .string()
    .min(1, "SMTP_PASS is required"),

  JWT_SECRET: z
    .string()
    .min(1, "JWT_SECRET is required"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  ACCESS_TOKEN_COOKIE_MAX_AGE_MS: z.coerce
    .number()
    .int()
    .positive("ACCESS_TOKEN_COOKIE_MAX_AGE_MS must be positive")
    .default(15 * 60 * 1000),
  REFRESH_TOKEN_COOKIE_MAX_AGE_MS: z.coerce
    .number()
    .int()
    .positive("REFRESH_TOKEN_COOKIE_MAX_AGE_MS must be positive")
    .default(7 * 24 * 60 * 60 * 1000),
  REFRESH_TOKEN_TTL_SECONDS: z.coerce
    .number()
    .int()
    .positive("REFRESH_TOKEN_TTL_SECONDS must be positive")
    .default(7 * 24 * 60 * 60),
});

export type RawEnv = z.infer<typeof envSchema>;

