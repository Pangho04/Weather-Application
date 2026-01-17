import { useAddressSearch } from '@/features/search/model/useAddressSearch';
import SearchInput from '@/features/search/ui/SearchInput';
import SearchResultList from '@/features/search/ui/SearchResultList';

export default function SearchPage() {
  const { query, setQuery, fullResults } = useAddressSearch();

  return (
    <div className="w-full h-full px-[8px] pt-[12px] lg:w-3/5 lg:self-center overflow-hidden">
      <div className="card w-full h-5/6 flex flex-col bg-base-300 p-4 shadow-lg">
        <div className="relative">
          <SearchInput query={query} setQuery={setQuery} />
          <SearchResultList fullResults={fullResults} />
        </div>
      </div>
    </div>
  );
}
