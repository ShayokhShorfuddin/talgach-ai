import { SendIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export function TextArea() {
  return (
    <div className="border-t bg-background px-4 pb-5 pt-3">
      <div className="mx-auto flex max-w-2xl items-end gap-2">
        <Textarea placeholder="Type your message here…" />

        <button
          type="button"
          aria-label="Send message"
          className="mb-0.5 shrink-0 rounded-full bg-talgach-green p-2.5 transition-transform duration-200 hover:scale-105"
        >
          <SendIcon size={18} color="#ffffff" strokeWidth={1.4} />
        </button>
      </div>
    </div>
  );
}
