import { httpBatchLink } from "@trpc/client";

export const trpcConfig = {
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
};
