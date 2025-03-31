import { createBrowserRouter, redirect } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./AppLayout";

import WelcomePage from "./UI/WelcomePage";
import Login from "./UI/Login";
import Dashboard from "./UI/Dashboard";
import ErrorPage from "./UI/ErrorPage";

function authLoader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.name || !user.hourlyRate) {
    return redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    loader: authLoader,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      // в майбутньому:
      // { path: "reports", element: <Reports /> },
      // { path: "statistics", element: <Statistics /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;
