import { z } from 'zod';

export const simulationSchema = z.object({
  response: z
    .string()
    .describe(
      "The HR's monologue reviewing the candidate's CV, thinking out loud about their decision-making process.",
    ),
  verdict: z
    .enum(['Approved', 'Rejected'])
    .describe('The final decision on the candidate.'),
  cvScore: z
    .number()
    .min(0)
    .max(10)
    .describe(
      'A score between 0 and 10 (can be a fraction) rating how well-written, formatted, and clearly defined the CV is.',
    ),
});
