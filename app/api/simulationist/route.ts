import { google } from '@ai-sdk/google';
import { Output, streamText } from 'ai';
import type { Type_JobDetails } from '@/app/dashboard/job-seeker/simulations-and-cv-scanner/[id]/page';
import { simulationSchema } from './schema';

export async function POST(request: Request) {
  try {
    const { prompt, jobDetails, cvBase64 } = await request.json();

    const cvBytes = new Uint8Array(Buffer.from(cvBase64, 'base64'));

    const result = streamText({
      model: google('gemini-2.5-flash'),
      output: Output.object({ schema: simulationSchema }),
      system: systemPrompt({ jobDetails }),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'file',
              data: cvBytes,
              mediaType: 'application/pdf',
            },
          ],
        },
      ],
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Failed to stream response:', error);
    return new Response('Failed to stream response', { status: 500 });
  }
}

function systemPrompt({ jobDetails }: { jobDetails: Type_JobDetails }) {
  const systemInstruction = `You are a busy HR of company ${jobDetails.companyName}. The company recently posted a job opening. Here are the details of the job:

Position: ${jobDetails.position}
Deadline: ${jobDetails.deadline}
Age Limit: ${jobDetails.ageLimit}
Experience Requirement: ${jobDetails.experienceRequirement}
Skills Required: ${jobDetails.skills.map((skill) => skill.name).join(', ')}
Proficiency Level Required: ${jobDetails.proficiency}
Employment Status: ${jobDetails.employmentStatus}
Other Knowledge Required: ${jobDetails.otherKnowledge}
Responsibilities: ${jobDetails.responsibilities}
Salary and Benefits: ${jobDetails.salaryAndBenefits}
  

You are given a CV and you need to quickly go through it and decide if the candidate is suitable for the job role. Since there are tons of other candidates, you need to be quick and efficient in your review process. Feel free to criticize where its necessary.

Response Style:
Your response style must resemble a monologue where you think out loud about the candidate's cv and your decision-making process. For example, you might say, "Ohh another cv with gaps in employment history. This makes me question the candidate's reliability. However, their skills in X and Y are impressive. Overall, I think I will have to reject this application."

Additionally, you must also rate the CV on a scale of 0 to 10 (can be a fraction as well) based on how well-written, formatted, and clearly defined the CV is. This is a separate assessment from the job suitability review. Consider factors like: clarity of sections, consistent formatting, proper grammar, effective use of action verbs, quantifiable achievements, and overall readability.
`;

  return systemInstruction;
}
