import { FormValues } from "@/pages/SearchPage/Schema";
import { Pagination } from "@/trpc";
import { useFormContext } from "react-hook-form";

interface PaginationControlsProps {
  data: Pagination;
}

export const usePaginationControls = ({ data }: PaginationControlsProps) => {
  const form = useFormContext<FormValues>();
  const currentPage = form.watch("page");
  const perPage = form.watch("perPage");
  const { totalPages, totalItems } = data;

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  const perPageOptions = [10, 20, 50, 100];

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(currentPage - 1, 2);
      let endPage = Math.min(currentPage + 1, totalPages - 1);
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return {
    getPageNumbers,
    startItem,
    endItem,
    totalItems,
    perPageOptions,
    form,
    currentPage,
    totalPages,
    perPage,
  };
};
