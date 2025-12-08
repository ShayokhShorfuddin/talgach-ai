import { integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const hrJob = pgTable('hr_job', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  position: text('position').notNull(),
  deadline: timestamp('deadline').notNull(),
  ageLimit: integer('age_limit').notNull(),
  experienceRequirement: text('experience_requirement').notNull(),

  skills: jsonb('skills')
    .$type<
      {
        name: string;
      }[]
    >()
    .notNull(),

  proficiency: text('proficiency').notNull(),
  employmentStatus: text('employment_status').notNull(),
  otherKnowledge: text('other_knowledge'),
  responsibilities: text('responsibilities').notNull(),
  salaryAndBenefits: text('salary_and_benefits').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});
