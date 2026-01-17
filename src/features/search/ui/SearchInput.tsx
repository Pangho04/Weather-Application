type Props = {
  query: string;
  setQuery: (query: string) => void;
};

function SearchInput({ query, setQuery }: Props) {
  return (
    <label htmlFor="search" className="input w-full" aria-label="검색창">
      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </g>
      </svg>
      <input
        type="search"
        className="grow"
        placeholder="주소를 입력하세요"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
      />
    </label>
  );
}

export default SearchInput;
