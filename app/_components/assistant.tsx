import { BotMessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Assistant() {
  return (
    <Button
      aria-label="Open chatbot"
      className={
        'size-10 p-0 bg-talgach-green rounded-full fixed bottom-6 right-6 z-100 hover:scale-108 transition-transform duration-200'
      }
    >
      <BotMessageSquare color="#ffffff" strokeWidth={1.5} className="size-5" />
      <span className="sr-only">Open Chatbot</span>
    </Button>
  );
}
