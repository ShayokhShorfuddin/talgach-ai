import { Button } from '@/components/ui/button';

export function HeroCTAButtons() {
  return (
    <div className="flex justify-center items-center gap-x-2 mt-6">
      <Button
        className={
          'bg-talgach-green rounded text-xs font-medium cursor-pointer'
        }
      >
        Test My Skills
      </Button>

      <Button
        variant={'outline'}
        className={
          'border-talgach-green rounded text-xs font-medium cursor-pointer'
        }
      >
        Build My AI CV
      </Button>
    </div>
  );
}
