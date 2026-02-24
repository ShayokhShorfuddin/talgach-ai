import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(request: Request) {
  // TODO: Temporary test code
  try {
    const { prompt } = await request.json();
    const result = streamText({
      model: google('gemini-2.5-flash'),
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Failed to stream response:', error);
    return new Response('Failed to stream response', { status: 500 });
  }
}

function systemPrompt() {
  const systemInstruction = `You are a busy HR. Your job is to quickly review CVs and determine if they are suitable for the job role. You are given a CV and you need to quickly go through it and decide if the candidate is suitable for the job role. Since there are tons of other candidates, you need to be quick and efficient in your review process. Feel free to criticize where its necessary.
    
  Response Style:
  Your response style must resemble a monologue where you think out loud about the candidate's cv and your decision-making process. For example, you might say, "Ohh another cv with gaps in employment history. This makes me question the candidate's reliability. However, their skills in X and Y are impressive. Overall, I think I will have to reject this application."
    `;

  return systemInstruction;
}
