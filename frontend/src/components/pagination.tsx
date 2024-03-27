import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Route, useNavigate } from "@tanstack/react-router";

const generatePagination = (currentPage: number, totalPages: number) => {
  const pages: (string | number)[] = [1];
  const visiblePages = Math.min(totalPages, 5);
  let startPage = 2;
  if (currentPage <= 3 || totalPages <= visiblePages) {
    startPage = 2;
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - visiblePages + 2;
  } else {
    startPage = currentPage - 1;
  }
  if (startPage > 2) pages.push("...");
  for (
    let i = 0;
    i < visiblePages - 2 && startPage <= totalPages - 1;
    i++, startPage++
  ) {
    pages.push(startPage);
  }
  if (startPage < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
};

export function PaginationNav({
  route,
  totalPages,
}: {
  route: Route;
  totalPages: number;
}) {
  const navigate = useNavigate({ from: route.fullPath });
  const routeSearch = route.useSearch();
  routeSearch.currentPage = routeSearch.currentPage || 1;
  const allPages = generatePagination(routeSearch.currentPage, totalPages);

  function PaginationNumber({
    page,
    isActive,
    position,
  }: {
    page: number | string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) {
    return isActive || position === "middle" ? (
      <PaginationEllipsis />
    ) : (
      <PaginationItem>
        <PaginationLink
          onClick={() => {
            navigate({
              search: { currentPage: page },
            });
          }}
          isActive={isActive}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              navigate({
                search: { currentPage: routeSearch.currentPage - 1 },
              });
            }}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={page}
              page={page}
              position={position}
              isActive={routeSearch.currentPage === page}
            />
          );
        })}
      </PaginationContent>
      <PaginationItem>
        <PaginationNext
          onClick={() => {
            navigate({
              search: { currentPage: routeSearch.currentPage + 1 },
            });
          }}
        />
      </PaginationItem>
    </Pagination>
  );
}
