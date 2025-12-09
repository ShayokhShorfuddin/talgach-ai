import { RichEditor } from './RichEditor';

export function WritingAssistant() {
  return (
    <section className="flex flex-col items-center">
      <p className="font-medium text-xl mt-10">Writing Assistant</p>
      <p className="text-sm text-neutral-700 mt-1">
        Leverage AI to enhance your writing skills and create compelling
        content.
      </p>

      <Options />
      <RichEditor />
    </section>
  );
}

function Options() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4 w-full max-w-4xl">
      <button
        type="button"
        className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer text-left"
      >
        <p className="font-medium">Statement Of Purpose (SOP) Generation</p>
        <p className="text-xs text-neutral-600 mt-1">
          Generate a compelling SOP tailored to your chosen program.
        </p>
      </button>
      <button
        type="button"
        className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer text-left"
      >
        <p className="font-medium">Scholarship Essay</p>
        <p className="text-xs text-neutral-600 mt-1">
          Craft persuasive scholarship essays to boost your chances of success.
        </p>
      </button>
      <button
        type="button"
        className="border border-neutral-200 rounded p-4 hover:border-talgach-green hover:bg-green-50 transition duration-300 cursor-pointer text-left"
      >
        <p className="font-medium">Email Generation</p>
        <p className="text-xs text-neutral-600 mt-1">
          Create professional emails for communicating with professors and
          admission offices.
        </p>
      </button>
    </div>
  );
}
