import { BotMessageSquare } from 'lucide-react';

export function Assistant() {
  return (
    <button
      type="button"
      aria-label="Open Chatbot"
      className="bg-talgach-green p-2 rounded-full fixed bottom-6 right-6 z-200 hover:scale-110 transition-transform duration-200 hover:cursor-pointer"
    >
      <BotMessageSquare color="#ffffff" strokeWidth={1.5} />
      <span className="sr-only">Open Chatbot</span>
    </button>
  );
}
