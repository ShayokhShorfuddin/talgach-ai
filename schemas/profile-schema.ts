import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const profile = pgTable('profile', {
  id: text('id').primaryKey(),

  name: text('name').notNull(),
  gender: text('gender'),
  education: text('education'),
  experience: text('experience'),
  jobType: text('job_type'),
  jobLevel: text('job_level'),
  interests: text('interests'),
  skills: text('skills'),
  passion: text('passion'),

  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
