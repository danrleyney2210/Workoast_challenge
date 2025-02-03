import { trpc } from "@/trpc";
import { formatDuration, intervalToDuration } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

export const useReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const start = searchParams.get("start") ?? "";
  const end = searchParams.get("end") ?? "";

  const startDate = new Date(start);
  const endDate = new Date(end);

  const [vehicle] = trpc.vehicles.get.useSuspenseQuery({ id: id! });

  const [quote] = trpc.reservations.quote.useSuspenseQuery({
    vehicleId: id!,
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
  });

  const createReservation = trpc.reservations.create.useMutation();

  const handleConfirm = async () => {
    try {
      const reservation = await createReservation.mutateAsync({
        vehicleId: id!,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
      });

      navigate(`/confirmation/${reservation.id}`);
    } catch (error) {
      console.error("Reservation failed:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const formattedDuration = formatDuration(
    intervalToDuration({
      start: startDate,
      end: endDate,
    }),
    { delimiter: ", " },
  );

  return {
    formattedDuration,
    handleConfirm,
    vehicle,
    quote,
    startDate,
    endDate,
  };
};
