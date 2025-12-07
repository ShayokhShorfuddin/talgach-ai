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
