import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tournaments/$tournamentId")({
  component: TournamentComponent,
});

function TournamentComponent() {
  const { tournamentId } = Route.useParams();
  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      Hello /tournaments/{tournamentId}
    </div>
  );
}
