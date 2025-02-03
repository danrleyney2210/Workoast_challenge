import { Button } from "@/components/ui/button";

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
import { useVehicleList } from "./useVehicleList";
import { PaginationControls } from "../PaginationControls/PaginationControls";

export function VehicleList() {
  const { searchResponse, startDateTime, endDateTime } = useVehicleList();

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
