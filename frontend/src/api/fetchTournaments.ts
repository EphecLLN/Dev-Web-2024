import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const domain = import.meta.env.VITE_API_URL!;

export type TournamentType = {
  id: string;
  gameId: number;
  name: string;
  format: string;
  public: boolean;
  nbrSlots: number;
  teamSize: number;
  date: Date;
  loserBracket: boolean;
};
export class TournamentNotFoundError extends Error {}

export const tournamentsQueryOptions = queryOptions({
  queryKey: ["tournaments"],
  queryFn: () => fetchTournaments(),
});

export const tournamentQueryOptions = (tournamentId: string) =>
  queryOptions({
    queryKey: ["tournaments", { tournamentId }],
    queryFn: () => fetchTournament(tournamentId),
  });

export async function fetchTournaments(): Promise<TournamentType[]> {
  console.log("Fetching tournaments...");
  return axios
    .get<TournamentType[]>(`${domain}/api/tournaments`)
    .then((res) => res.data);
}

export async function fetchTournament(
  tournamentId: string,
): Promise<TournamentType> {
  console.log(`Fetching tournament with id "${tournamentId}"...`);
  const user = await axios
    .get<TournamentType>(`${domain}/api/tournaments/${tournamentId}`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        throw new TournamentNotFoundError(
          `Tournament with id "${tournamentId}" not found`,
        );
      }
      throw error;
    });

  return user;
}
