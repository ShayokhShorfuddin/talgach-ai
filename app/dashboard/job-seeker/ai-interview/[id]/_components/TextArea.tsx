import { SendIcon } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';

export function TextArea() {
  return (
    <div className="absolute bottom-3 flex justify-center items-center w-full gap-2">
      <Textarea placeholder="Type your messages here" className="w-1/2" />

      <button
        type="button"
        className="rounded-full bg-talgach-green p-2 size-fit hover:scale-105 transition-transform duration-200"
      >
        <SendIcon size={20} color="#ffffff" strokeWidth={1.4} />
      </button>
    </div>
  );
}
