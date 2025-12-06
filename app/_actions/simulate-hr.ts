'use server';

import { google } from '@ai-sdk/google';
import { createStreamableValue } from '@ai-sdk/rsc';
import { streamObject } from 'ai';
import z from 'zod';

export async function simulateHR({
  bytes,
}: {
  bytes: Uint8Array<ArrayBufferLike>;
}) {
  const stream = createStreamableValue();

  (async () => {
    try {
      const { partialObjectStream } = await streamObject({
        model: google('gemini-2.5-flash'),

        schema: z.object({
          response: z.string(),
          isApproved: z.boolean(),
        }),

        system: prepareSystemPrompt(),

        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Review the CV and check if the CV is suitable for the job role. At last, decide if the candidate is approved for the job role. Put the approval status on the isApproved schema field in the response object.',
              },
              {
                type: 'file',
                data: bytes,
                mediaType: 'application/pdf',
              },
            ],
          },
        ],
      });

      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }

      stream.done();
    } catch (error) {
      stream.error(error);
    }
  })();

  return { object: stream.value };
}

function prepareSystemPrompt() {
  const systemInstruction = `You are a busy HR. Your job is to quickly review CVs and determine if they are suitable for the job role. You are given a CV and you need to quickly go through it and decide if the candidate is suitable for the job role. Since there are tons of other candidates, you need to be quick and efficient in your review process. Feel free to criticize.
    
  Response Style:
  Your response style must resemble a monologue where you think out loud about the candidate's cv and your decision-making process. For example, you might say, "Ohh another cv with gaps in employment history. This makes me question the candidate's reliability. However, their skills in X and Y are impressive. Overall, I think I will have to reject this application."
    `;

  return systemInstruction;
}
