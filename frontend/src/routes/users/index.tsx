import { usersQueryOptions, UserType } from "@/api/fetchUsers";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SkeletonList } from "@/components/users/skeleton-list";
import { UserList } from "@/components/users/user-list";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const PAGE_SIZE = 9;
const MAX_VISIBLE_PAGES = 5;

export const Route = createFileRoute("/users/")({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoading, isError, data, error } = useQuery(usersQueryOptions);

  const handleNextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const handlePrevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  const handlePageChange = (page: number) => setCurrentPage(page);

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

  const generatePageNumbers = () => {
    const pages = [1];

    const visiblePages = Math.min(totalPages, MAX_VISIBLE_PAGES);

    let startPage = 2;
    if (currentPage <= 3 || totalPages <= visiblePages) {
      startPage = 2;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - visiblePages + 2;
    } else {
      startPage = currentPage - 1;
    }

    if (startPage > 2) pages.push(-1);

    for (
      let i = 0;
      i < visiblePages - 2 && startPage <= totalPages - 1;
      i++, startPage++
    ) {
      pages.push(startPage);
    }

    if (startPage < totalPages - 1) pages.push(-1);

    if (totalPages > 1) pages.push(totalPages);

    return pages;
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
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevPage} href="#" />
            </PaginationItem>
            {generatePageNumbers().map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === -1 ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </React.Fragment>
            ))}
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
