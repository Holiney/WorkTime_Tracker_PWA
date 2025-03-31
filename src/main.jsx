import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./App";
import "./index.css";

import { UserProvider } from "./contexts/UserContext";
import { WorkItemsProvider } from "./contexts/WorkItemsContext.jsx"; // 👈 ТУТ

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <WorkItemsProvider>
        <RouterProvider router={router} />
      </WorkItemsProvider>
    </UserProvider>
  </React.StrictMode>
);
