import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const simulation = pgTable('simulation', {
  id: text('id').primaryKey(),
  jobSeekerId: text('job_seeker_id').notNull(),
  thought: text('thought').notNull(),
  isApproved: boolean('is_approved').notNull().default(false),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
