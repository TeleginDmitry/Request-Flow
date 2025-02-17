import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@router/router";
import { createRoot } from "react-dom/client";
import { CombineProviders } from "./providers/Combine.provider";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <CombineProviders>
    <RouterProvider router={router}></RouterProvider>
  </CombineProviders>
);

if ((module as any).hot) {
  (module as any).hot.accept();
}
