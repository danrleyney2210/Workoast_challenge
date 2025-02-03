import { useFormContext } from "react-hook-form";

import { trpc } from "@/trpc";
import { FormValues } from "@/pages/SearchPage/Schema";

export const useAdditionalFilters = () => {
  const form = useFormContext<FormValues>();
  const [options] = trpc.vehicles.options.useSuspenseQuery();

  const price = form.watch("price");
  const classification = form.watch("classification");
  const make = form.watch("make");
  const minPassengers = form.watch("minPassengers");

  return {
    form,
    price,
    classification,
    make,
    minPassengers,
    options,
  };
};
