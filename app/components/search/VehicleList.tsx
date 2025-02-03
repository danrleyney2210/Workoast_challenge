import { Pagination, trpc } from "@/trpc";
import { useFormContext } from "react-hook-form";
import { combineDateTime, FormValues } from "@/components/search/form";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function PaginationControls({ data }: { data: Pagination }) {
  const form = useFormContext<FormValues>();
  const currentPage = form.watch("page");
  const { totalPages, totalItems, itemsPerPage } = data;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

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

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
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

      <p className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} vehicles
      </p>
    </div>
  );
}

export function VehicleList() {
  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");
  const minPassengers = form.watch("minPassengers");
  const classification = form.watch("classification");
  const make = form.watch("make");
  const price = form.watch("price");
  const page = form.watch("page");

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime],
  );
  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime],
  );

  const [searchResponse] = trpc.vehicles.search.useSuspenseQuery(
    {
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      page: Number(page),
      passengerCount: Number(minPassengers),
      classification: classification,
      make: make,
      priceMin: price[0],
      priceMax: price[1],
    },
    {
      keepPreviousData: true,
    },
  );

  if (searchResponse.vehicles.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Car className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            No vehicles found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search criteria
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Vehicle</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchResponse.vehicles.map((vehicle) => {
            const bookNowParams = new URLSearchParams({
              id: vehicle.id,
              start: startDateTime.toISOString(),
              end: endDateTime.toISOString(),
            });

            return (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                      {vehicle.thumbnail_url ? (
                        <img
                          src={vehicle.thumbnail_url}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Car className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.year}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Users className="w-3 h-3" />
                        {vehicle.max_passengers} passengers
                      </Badge>
                      <Badge variant="outline">{vehicle.classification}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Available for your dates</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild>
                    <Link
                      to={{
                        pathname: "review",
                        search: bookNowParams.toString(),
                      }}
                    >
                      Book now
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <PaginationControls data={searchResponse.pagination} />
    </div>
  );
}
