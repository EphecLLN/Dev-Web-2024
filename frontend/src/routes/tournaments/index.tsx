import { tournamentsQueryOptions } from "@/api/fetchTournaments";
import { Search } from "@/components/search";
import { TournamentList } from "@/components/tournaments/tournament-list";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

type TournamentSearch = {
  page: number;
  query: string;
};

export const Route = createFileRoute("/tournaments/")({
  validateSearch: (search: Record<string, unknown>): TournamentSearch => {
    return {
      page: Number(search.page) || 1,
      query: (search.query as string) || "",
    };
  },
  component: TournamentComponent,
});

function TournamentComponent() {
  const { page, query } = Route.useSearch();
  const { isLoading, isError, data, error } = useQuery(tournamentsQueryOptions);

  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Here is the list of all tournaments
      </h1>

      <Search placeholder="Search tournaments..." />

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      )}
      {!isLoading && !isError && !data && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          No tournaments found matching "{query}" on page {page}
        </p>
      )}
      {!isLoading && !isError && data && <TournamentList tournaments={data} />}
    </div>
  );
}
