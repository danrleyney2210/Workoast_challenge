import { httpBatchLink } from "@trpc/client";

export const API_BASE_URL = "/trpc";

export const trpcConfig = {
  links: [
    httpBatchLink({
      url: API_BASE_URL,
    }),
  ],
};
