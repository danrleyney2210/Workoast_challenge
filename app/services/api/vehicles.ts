import { SearchParams } from "@/types";
import { trpc } from "../trpc/client";

export const vehicleService = {
  search: (params: SearchParams) => {
    return trpc.vehicles.search.useQuery(params, {
      keepPreviousData: true,
    });
  },

  getOptions: () => {
    return trpc.vehicles.options.useQuery();
  },

  getById: (id: string) => {
    return trpc.vehicles.get.useQuery({ id });
  },
};
