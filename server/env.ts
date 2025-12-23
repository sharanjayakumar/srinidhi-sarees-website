import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(8080),

  // Database
  MONGODB_URI: z.string().url().optional(),
  MONGODB_DB: z.string().default("fusion-starter"),
  NETLIFY_DATABASE_URL: z.string().url().optional(),

  // Admin auth
  ADMIN_PASSWORD: z.string().min(1).default("change-me"),

  // WhatsApp / Meta Cloud API
  WHATSAPP_TOKEN: z.string().optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  WHATSAPP_TO_DEFAULT: z.string().optional(),
  WHATSAPP_VERIFY_TOKEN: z.string().optional(),

  // Client (Vite only exposes VITE_* in browser). Used for documentation purposes
  VITE_API_BASE_URL: z.string().optional(),
});

export const env = EnvSchema.parse(process.env);
