import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./shared/api/index.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SinglePost from "./pages/single-post/index.tsx";
import MainPage from "./pages/mainpage/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/:id",
    element: <SinglePost />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
