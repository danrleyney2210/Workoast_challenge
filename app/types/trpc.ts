import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "server/router";

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type SearchResponse = RouterOutputs["vehicles"]["search"];
export type Pagination = SearchResponse["pagination"];
export type VehicleOptions = RouterOutputs["vehicles"]["options"];

export type { AppRouter };
