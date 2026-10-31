import "dotenv/config";
import { envSchema } from "./env.schema.js";

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errors = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
  throw new Error(`Invalid environment variables: ${errors}`);
}

const rawEnv = parsed.data;

export const env = {
  port: rawEnv.PORT,
  nodeEnv: rawEnv.NODE_ENV,
  isProduction: rawEnv.NODE_ENV === "production",
  isDevelopment: rawEnv.NODE_ENV === "development",
  databaseUrl: rawEnv.DATABASE_URL,
  directUrl: rawEnv.DIRECT_URL,
  redis: {
    url: rawEnv.REDIS_URL,
  },
  smtp: {
    user: rawEnv.SMTP_USER,
    pass: rawEnv.SMTP_PASS,
  },
  jwt: {
    secret: rawEnv.JWT_SECRET,
    accessExpiresIn: rawEnv.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: rawEnv.JWT_REFRESH_EXPIRES_IN,
  },
  auth: {
    accessTokenMaxAgeMs: rawEnv.ACCESS_TOKEN_COOKIE_MAX_AGE_MS,
    refreshTokenMaxAgeMs: rawEnv.REFRESH_TOKEN_COOKIE_MAX_AGE_MS,
    refreshTokenTtlSeconds: rawEnv.REFRESH_TOKEN_TTL_SECONDS,
  },
} as const;

export type Env = typeof env;
