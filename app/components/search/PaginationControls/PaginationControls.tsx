import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { Pagination } from "@/trpc";
import { usePaginationControls } from "./usePaginationControls";

export function PaginationControls({ data }: { data: Pagination }) {
  const {
    form,
    currentPage,
    totalPages,
    perPage,
    startItem,
    endItem,
    totalItems,
    perPageOptions,
    getPageNumbers,
  } = usePaginationControls({ data });

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => form.setValue("page", currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, idx) =>
              typeof page === "number" ? (
                <Button
                  key={idx}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-8"
                  onClick={() => form.setValue("page", page)}
                >
                  {page}
                </Button>
              ) : (
                <span key={idx} className="px-2">
                  {page}
                </span>
              ),
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => form.setValue("page", currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>

        <Select
          value={String(perPage)}
          onValueChange={(value) => {
            form.setValue("perPage", Number(value));
            form.setValue("page", 1); // Volta para primeira página ao mudar itens por página
          }}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {perPageOptions.map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} vehicles
      </p>
    </div>
  );
}
