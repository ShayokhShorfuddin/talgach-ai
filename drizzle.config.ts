import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './schemas/schema.ts',
  dialect: 'postgresql',

  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: <>
    url: process.env.DATABASE_URL!,
  },
});
