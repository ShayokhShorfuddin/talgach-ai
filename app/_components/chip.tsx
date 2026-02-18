import { ArrowRightIcon } from 'lucide-react';

export function Chip() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center p-1.5 mt-2 text-xs text-talgach-green gap-x-2 bg-green-50 rounded-full cursor-pointer">
        <p className="hidden xs:block py-1 px-2 border border-green-300 rounded-full font-medium">
          New feature
        </p>
        <p>Launching state-of-the-art models.</p>

        <ArrowRightIcon strokeWidth={1} className="h-4 mr-2" />
      </div>
    </div>
  );
}
