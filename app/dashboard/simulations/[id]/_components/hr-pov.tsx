'use client';

import Markdown from 'react-markdown';

export function HRPov({ text, decision }: { text: string; decision: string }) {
  return (
    <div className="mt-10 p-8 rounded prose w-full max-w-4xl">
      <h3 className="text-lg font-semibold mb-2">Thoughts</h3>
      <Markdown>{text}</Markdown>

      <p
        className={`mt-5 ${decision === 'Approved' ? 'text-talgach-green' : 'text-red-500'}`}
      >
        This application has been <strong>{decision.toLowerCase()}</strong>.
      </p>
    </div>
  );
}
