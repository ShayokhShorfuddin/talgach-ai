import Image from 'next/image';

export function ProgramCard(program: {
  id: number;
  flagIcon: string;
  programName: string;
  universityName: string;
  eligibilityTags: string[];
}) {
  return (
    <div
      key={program.id}
      className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer"
    >
      <div className="flex">
        <Image
          src={program.flagIcon}
          alt={`${program.universityName} logo`}
          className="w-6 h-min"
        />

        <div className="ml-4 leading-none">
          <p className="text-sm font-medium">{program.programName}</p>
          <p className="text-xs text-neutral-700">{program.universityName}</p>
        </div>
      </div>

      <div className="flex items-center gap-x-1 mt-1">
        {program.eligibilityTags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-neutral-600 border border-neutral-300 rounded-full px-2 py-0.5 mt-3 text-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
