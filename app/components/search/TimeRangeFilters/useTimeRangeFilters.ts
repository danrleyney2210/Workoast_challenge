import { addMinutes, format, isBefore, isSameDay, startOfDay } from "date-fns";
import { FormValues } from "@/pages/SearchPage/Schema";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";

export const useTimeRangeFilters = () => {
  function getTimeOptions(startDate: Date) {
    const start = startOfDay(startDate);
    return Array.from({ length: 96 }, (_, i) => {
      const date = addMinutes(start, i * 15);

      const value = format(date, "HH:mm");
      const label = format(date, "p");

      const now = new Date();
      const isToday = isSameDay(startDate, now);
      const isDisabled = isToday && isBefore(date, now);

      return { value, label, isDisabled };
    });
  }

  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  const startTimeOptions = useMemo(
    () => getTimeOptions(startDate),
    [startDate],
  );
  const endTimeOptions = useMemo(() => getTimeOptions(endDate), [endDate]);

  return {
    getTimeOptions,
    startTimeOptions,
    endTimeOptions,
    startDate,
    endDate,
    form,
  };
};
