import { Conversation } from './_components/Conversation';
import { TextArea } from './_components/TextArea';

export default function Page() {
  return (
    <div className="flex h-dvh flex-col">
      <div className="flex-1 overflow-y-auto">
        <Conversation />
      </div>

      <TextArea />
    </div>
  );
}
