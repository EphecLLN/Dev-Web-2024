import { usersQueryOptions } from "@/api/fetchUsers";
import UrlPagination from "@/components/pagination";
import { Search } from "@/components/search";
import { SkeletonList } from "@/components/users/skeleton-list";
import { UserList } from "@/components/users/user-list";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";
import React from "react";

type UserSearch = {
  page: number;
  query: string;
};

const NUMBER_OF_USERS_PER_PAGE = 9;
const domain = import.meta.env.VITE_API_URL!;

export const Route = createFileRoute("/users/")({
  validateSearch: (search: Record<string, unknown>): UserSearch => {
    return {
      page: Number(search.page) || 1,
      query: (search.query as string) || "",
    };
  },
  component: UsersIndexComponent,
});

async function fetchCount(query: string): Promise<number> {
  console.log(`Fetching users count with query "${query}"...`);
  const res = await axios.get<number>(
    `${domain}/api/users/count?query=${query}`,
  );
  return res.data;
}

function UsersIndexComponent() {
  const { page, query } = Route.useSearch();
  const countQuery = useQuery({
    queryKey: ["usersCount", query],
    queryFn: () => fetchCount(query),
  });
  const userQuery = useQuery(usersQueryOptions(query, page));
  const totalPages = Math.ceil(countQuery.data! / NUMBER_OF_USERS_PER_PAGE);

  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Here is a list of all users registered
      </h1>
      <Search placeholder="Search users..." />

      {(countQuery.isLoading || userQuery.isLoading) &&
        !countQuery.isError &&
        !userQuery.isError && <SkeletonList count={NUMBER_OF_USERS_PER_PAGE} />}

      {(countQuery.isError &&
        (countQuery.error as AxiosError)?.response?.status === 404) ||
      (userQuery.isError &&
        (userQuery.error as AxiosError)?.response?.status === 404) ? (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          No users found matching "{query}" on page {page}
        </p>
      ) : null}

      {(countQuery.isError &&
        (countQuery.error as AxiosError)?.response?.status !== 404) ||
      (userQuery.isError &&
        (userQuery.error as AxiosError)?.response?.status !== 404) ? (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {(countQuery.error as AxiosError)?.message ||
            (userQuery.error as AxiosError)?.message ||
            "An unknown error occurred"}
        </p>
      ) : null}

      {!countQuery.isLoading && !userQuery.isLoading && userQuery.data && (
        <React.Fragment>
          <UserList users={userQuery.data} />
          {totalPages >= 2 && <UrlPagination totalPages={totalPages} />}
        </React.Fragment>
      )}
    </div>
  );
}
