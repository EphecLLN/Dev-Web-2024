import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import axios from "axios";

const domain = import.meta.env.VITE_API_URL!;

export type UserType = {
  id: string;
  email: string;
  username: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

export class UserNotFoundError extends Error {}

export const usersQueryOptions = (query: string, page: number) =>
  queryOptions({
    queryKey: ["users", { query, page }],
    queryFn: () => fetchUsers(query, page),
    placeholderData: keepPreviousData,
  });

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["users", { userId }],
    queryFn: () => fetchUser(userId),
    placeholderData: keepPreviousData,
  });

export async function fetchUsers(
  query: string = "",
  page: number = 1,
): Promise<UserType[]> {
  console.log(`Fetching users with query "${query}" for page ${page}...`);
  return axios
    .get<UserType[]>(`${domain}/api/users?page=${page}&query=${query}`)
    .then((res) => res.data);
}

export async function fetchUser(userId: string): Promise<UserType> {
  console.log(`Fetching user with id "${userId}"...`);
  const user = await axios
    .get<UserType>(`${domain}/api/users/${userId}`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        throw new UserNotFoundError(`User with id "${userId}" not found`);
      }
      throw error;
    });

  return user;
}
