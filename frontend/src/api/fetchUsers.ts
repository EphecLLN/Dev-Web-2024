import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export type UserType = {
  id: string;
  email: string;
  username: string;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
};

export class UserNotFoundError extends Error {}

export const usersQueryOptions = queryOptions({
  queryKey: ["users"],
  queryFn: () => fetchUsers(),
});

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["users", { userId }],
    queryFn: () => fetchUser(userId),
  });

export async function fetchUsers(): Promise<UserType[]> {
  console.log("Fetching users...");
  return axios.get<UserType[]>("/api/users").then((res) => res.data);
}

export async function fetchUser(userId: string): Promise<UserType> {
  console.log(`Fetching user with id "${userId}"...`);
  const user = await axios
    .get<UserType>(`/api/users/${userId}`)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        throw new UserNotFoundError(`User with id "${userId}" not found`);
      }
      throw error;
    });

  return user;
}
