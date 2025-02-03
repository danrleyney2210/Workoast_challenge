import { createBrowserRouter } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage/SearchPage";
import { ReviewPage } from "@/pages/ReviewPage/ReviewPage";
import { ConfirmationPage } from "@/pages/ConfirmationPage";

export const routes = [
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/review",
    element: <ReviewPage />,
  },
  {
    path: "/confirmation/:reservationId",
    element: <ConfirmationPage />,
  },
];

export const router = createBrowserRouter(routes);
