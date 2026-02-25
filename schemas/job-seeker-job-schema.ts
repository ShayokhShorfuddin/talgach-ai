import { integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const jobSeekerJob = pgTable('job_seeker_job', {
  id: text('id').primaryKey(),
  jobSeekerId: text('job_seeker_id').notNull(),
  companyName: text('company_name').notNull(),
  position: text('position').notNull(),
  deadline: timestamp('deadline').notNull(),
  maximumAgeLimit: integer('maximum_age_limit').notNull(),
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
  otherKnowledge: text('other_knowledge').notNull(),
  responsibilities: text('responsibilities').notNull(),
  salaryAndBenefits: text('salary_and_benefits').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});
