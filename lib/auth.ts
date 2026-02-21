import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import * as schema from '@/schemas/schema';
import { db } from './db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),

  user: {
    deleteUser: {
      enabled: true,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60, // Cache duration in seconds (e.g., 1 hour)
    },
  },

  plugins: [nextCookies()],

  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://talgach-ai.vercel.app',
  trustedOrigins: ['http://localhost:3000', 'https://talgach-ai.vercel.app'],
});
