import { Input } from "./ui/input";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearch({
    strict: false,
  }) as Record<string, string>;
  const navigate = useNavigate({});

  const handleSearch = useDebouncedCallback((query) => {
    console.log(`Searching... ${query}`);

    navigate({
      search: { page: 1, query: query },
    });
  }, 300);

  return (
    <div className="relative py-4">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className="peer pl-10"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.query?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground peer-focus:text-gray-900" />
    </div>
  );
}
