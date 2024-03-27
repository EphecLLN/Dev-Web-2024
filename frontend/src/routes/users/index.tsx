import { usersQueryOptions, UserType } from "@/api/fetchUsers";
import { MainPagination } from "@/components/main-pagination";
import { PaginationNav } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { SkeletonList } from "@/components/users/skeleton-list";
import { UserList } from "@/components/users/user-list";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

const PAGE_SIZE = 9;

const userSearchSchema = z.object({
  currentPage: z.number().catch(1),
});

export const Route = createFileRoute("/users/")({
  validateSearch: userSearchSchema,
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoading, isError, data, error } = useQuery(usersQueryOptions);

  const onNextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const onPrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const onPageChange = (page: number) => setCurrentPage(page);

  const filteredUsers = data
    ? data.filter((user: UserType) =>
        user.username.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredUsers.length / PAGE_SIZE) || 1);
  }, [search, data, filteredUsers.length]);

  const getPaginatedUsers = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredUsers.slice(start, end);
  };

  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Here is a list of all users registered
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
      {isLoading && <SkeletonList count={PAGE_SIZE} />}
      {isError && !isLoading && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      )}
      {!isLoading && !isError && filteredUsers.length === 0 && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          No users found matching "{search}"
        </p>
      )}
      {!isLoading && !isError && <UserList users={getPaginatedUsers()} />}
      {!isLoading && !isError && totalPages > 1 && (
        <MainPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
        />
      )}
      {!isLoading && !isError && totalPages > 1 && (
        <PaginationNav route={Route} totalPages={totalPages} />
      )}
    </div>
  );
}
