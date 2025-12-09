export function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="w-full max-w-lg mt-5">
      <input
        type="search"
        name="search"
        value={searchQuery}
        placeholder="Search programs…"
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-neutral-200 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-talgach-green"
      />
    </div>
  );
}

// TODO: remove me
// Look at information-form.tsx carefully. I am using Tanstack Form and Zod.

// I want you to create a form that resembles the following structure:

// 1. University name
// 2. University/Program link
// 3. Country name
// 4. Department
// 5. Program Name
// 6. Semester name
// 7. Name of the professor. Add an email box for professor and a check box which indicates if the professor has been emailed or not.

// After these have been added, add a seperate section called "Requirements".

// In the "Requirements" section, add a form with the following fields:

// 1. Language tests. Users can add multiple tests. They should be able to add "Test name" and a "Test score" for every test they add. For example, if they wanted to add "IELTS", they should be able to write the test name "IELTS" and a test score like "3.56" for example.

// 2. Degree name and CGPA. Same logic as language test.

// 3. Recomendation. A number input box that indications how many recomendations needed.

// 4. Payment. Its a "Yes/No" type button. If Yes is selected, show an additional field asking for "amount".

// 5. "SOP". Its a "Yes/No" type button. If Yes is selected, show an additional "yes/no" type field saying "Ready" or "Not ready".

// 6. "Miscellaneous". Just a normal textarea.

// Important Note: Each "Requirements" field should be accompanied by a "Fulfilled?" field. Basically, this button can be checked by user if they believe they have fulfilled the requirement.
