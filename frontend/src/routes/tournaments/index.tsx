import { tournamentsQueryOptions } from "@/api/fetchTournaments";
import { TournamentList } from "@/components/tournaments/tournament-list";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/tournaments/")({
  component: TournamentComponent,
});

function TournamentComponent() {
  const [search, setSearch] = useState("");
  const { isLoading, isError, data, error } = useQuery(tournamentsQueryOptions);

  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Here is the list of all tournaments
      </h1>
      <div className="py-4">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      )}
      {!isLoading && !isError && !data && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          No tournaments found matching "{search}"
        </p>
      )}
      {!isLoading && !isError && data && <TournamentList tournaments={data} />}
    </div>
  );
}
