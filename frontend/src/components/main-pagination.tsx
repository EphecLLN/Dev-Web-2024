import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Fragment } from "react/jsx-runtime";

const MAX_VISIBLE_PAGES = 5;

export function MainPagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}) {
  function generatePageNumbers() {
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
  }

  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrevPage} href="#" />
        </PaginationItem>
        {generatePageNumbers().map((pageNumber, index) => (
          <Fragment key={index}>
            {pageNumber === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => onPageChange(pageNumber)}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )}
          </Fragment>
        ))}
        <PaginationItem>
          <PaginationNext onClick={onNextPage} href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
