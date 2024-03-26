import { TournamentType } from "@/api/fetchTournaments";
import { Link } from "@tanstack/react-router";

export const TournamentList = ({
  tournaments,
}: {
  tournaments: TournamentType[];
}) => {
  return (
    <div className="flex min-h-[640px] flex-col gap-2">
      {tournaments.map((tournament) => (
        <Link
          to="/tournaments/$tournamentId"
          params={{ tournamentId: tournament.id }}
          key={tournament.id}
          className="flex items-center rounded-lg border p-3 hover:bg-accent"
        >
          <p>{tournament.name}</p>
        </Link>
      ))}
    </div>
  );
};
