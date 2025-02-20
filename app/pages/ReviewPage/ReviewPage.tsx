import { Button } from "@/components/ui/button";
import { formatCents } from "@/lib/formatters";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator.tsx";
import { VehicleDetails } from "@/components/VehicleDetails.tsx";
import { MiniPageLayout } from "../../components/MiniPageLayout";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { useReviewPage } from "./useReviewPage";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function Timeline({ startDate, endDate }: { startDate: Date; endDate: Date }) {
  return (
    <div className="flex relative">
      <div className="absolute top-1.5 bottom-1.5 flex flex-col items-center">
        <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white ring-1 z-10 ring-blue-400"></div>
        <div className="flex-grow border-l-2 border-dotted border-gray-300"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white ring-1 z-10 ring-blue-400"></div>
        <div className="flex-grow border-l-2 border-dotted border-gray-300"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white ring-1 z-10 ring-blue-400"></div>
      </div>
      <div className="flex flex-col justify-between gap-4 h-full ml-8">
        <div>
          <span className="text-sm text-gray-600">Pick-up</span>
          <p className="font-medium">{format(startDate, "PPpp")}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Rental period</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Drop-off</span>
          <p className="font-medium">{format(endDate, "PPpp")}</p>
        </div>
      </div>
    </div>
  );
}

function Content() {
  const navigate = useNavigate();

  const {
    vehicle,
    quote,
    formattedDuration,
    startDate,
    endDate,
    handleConfirm,
  } = useReviewPage();

  return (
    <div className="flex flex-col gap-8">
      <VehicleDetails vehicle={vehicle} />

      <Separator />

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold mb-4">Reservation Summary</h3>
        <div className="grid grid-cols-2 gap-6">
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-600">Hourly Rate</dt>
              <dd>
                <span className="text-lg">
                  {formatCents(vehicle.hourly_rate_cents)}
                </span>
                <span className="text-xs">/hr</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Duration</dt>
              <dd>{formattedDuration}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Total Cost</dt>
              <dd className="text-2xl font-medium tracking-tight">
                {formatCents(quote?.totalPriceCents || 0)}
              </dd>
            </div>
          </dl>

          <Timeline startDate={startDate} endDate={endDate} />
        </div>

        <div className="flex flex-col gap-2">
          <Button size="lg" className="w-full" onClick={handleConfirm}>
            Confirm reservation
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ReviewPage() {
  return (
    <MiniPageLayout
      title="Almost there"
      subtitle="Your adventure is about to begin! Please confirm your reservation below."
    >
      <ErrorBoundary
        fallback={<ErrorFallback message="Failed to load reservation" />}
      >
        <Suspense
          fallback={
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-[178px] rounded" />
              <Skeleton className="w-full h-[178px] rounded" />
              <Skeleton className="w-full h-[178px] rounded" />
            </div>
          }
        >
          <Content />
        </Suspense>
      </ErrorBoundary>
    </MiniPageLayout>
  );
}
