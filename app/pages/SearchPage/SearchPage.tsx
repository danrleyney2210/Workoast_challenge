import { ErrorFallback } from "@/components/ErrorFallback";
import { Button } from "@/components/ui/button.tsx";
import { Form } from "@/components/ui/form.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { VehicleList } from "@/components/search/VehicleList/VehicleList.tsx";

import { useSearchPage } from "./useSearchPage.ts";
import { AdditionalFilters } from "@/components/search/AdditionalFilters/AdditionalFilters.tsx";
import { TimeRangeFilters } from "@/components/search/TimeRangeFilters/TimeRangeFilters.tsx";

export function SearchPage() {
  const { form } = useSearchPage();

  const filters = (
    <ErrorBoundary
      fallback={<ErrorFallback message="Failed to load filters" />}
    >
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-[100px] rounded" />
            <Skeleton className="w-full h-[100px] rounded" />
            <Skeleton className="w-full h-[100px] rounded" />
          </div>
        }
      >
        <AdditionalFilters />
      </Suspense>
    </ErrorBoundary>
  );

  return (
    <Form {...form}>
      <div className="container mx-auto flex flex-col">
        <div className="grid grid-cols-12 grid-flow-row">
          <div className="pt-12 pb-4 border-b grid grid-cols-subgrid col-span-12 md:sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <div className="px-4 flex items-end col-span-12 md:col-span-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                Workoast Wheels
              </h1>
            </div>
            <div className="px-4 col-span-12 md:col-span-9 mt-4 md:mt-0">
              <TimeRangeFilters />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 px-4 md:py-8">
            <div className="md:hidden mt-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Filters</Button>
                </SheetTrigger>
                <SheetContent>{filters}</SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:block">{filters}</div>
          </div>

          <div className="col-span-12 md:col-span-9 px-4 py-8">
            <ErrorBoundary
              fallback={<ErrorFallback message="Failed to load vehicles" />}
            >
              <Suspense
                fallback={
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-full h-[178px] rounded" />
                    <Skeleton className="w-full h-[178px] rounded" />
                    <Skeleton className="w-full h-[178px] rounded" />
                    <Skeleton className="w-full h-[178px] rounded" />
                  </div>
                }
              >
                <VehicleList />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </Form>
  );
}
