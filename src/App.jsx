import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayot from "./UI/AppLayot";
import Error from "./UI/Error";
import Home from "./UI/Home";
import Login from "./UI/Login";
import Dashboard from "./UI/Dashboard";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayot />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/Dashboard", element: <Dashboard /> },
      ],
    },
  ]);
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
