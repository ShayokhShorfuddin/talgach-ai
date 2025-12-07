import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const program = pgTable('program', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  universityName: text('university_name').notNull(),
  programLink: text('program_link'),
  country: text('country').notNull(),
  department: text('department').notNull(),
  programName: text('program_name').notNull(),
  semester: text('semester').notNull(),

  professor: jsonb('professor').$type<{
    name: string;
    email: string;
    emailed: boolean;
  }>(),

  requirements: jsonb('requirements').$type<{
    languageTests: {
      name: string;
      score: string;
      fulfilled: boolean;
    }[];
    degrees: {
      name: string;
      cgpa: string;
      fulfilled: boolean;
    }[];
    recommendation: {
      count: number;
      fulfilled: boolean;
    };
    payment: {
      required: boolean;
      amount: string;
      fulfilled: boolean;
    };
    sop: {
      required: boolean;
      ready: boolean;
      fulfilled: boolean;
    };
    miscellaneous: {
      text: string;
      fulfilled: boolean;
    };
  }>(),

  startedApplication: boolean('started_application').notNull().default(false),
  submittedApplication: boolean('submitted_application')
    .notNull()
    .default(false),
  madePayment: boolean('made_payment').notNull().default(false),
  approved: boolean('approved').notNull().default(false),

  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
