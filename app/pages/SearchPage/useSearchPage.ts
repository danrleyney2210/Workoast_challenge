import { roundToNearest30Minutes } from "@/lib/times.ts";
import { addDays, addHours, format } from "date-fns";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormValues } from "./Schema";

export const useSearchPage = () => {
  const [initialStartDateAndTime] = useState(() =>
    roundToNearest30Minutes(addHours(new Date(), 1)),
  );

  const [initialEndDateAndTime] = useState(() =>
    addDays(initialStartDateAndTime, 1),
  );

  const form = useForm<FormValues>({
    defaultValues: {
      startDate: initialStartDateAndTime,
      startTime: format(initialStartDateAndTime, "HH:mm"),
      endDate: initialEndDateAndTime,
      endTime: format(initialEndDateAndTime, "HH:mm"),
      minPassengers: 1,
      classification: [],
      make: [],
      price: [10, 100],
      page: 1,
      perPage: 10,
    },
  });

  return {
    form,
  };
};
