import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayot from "./UI/AppLayot";
import Error from "./UI/Error";
import Home from "./UI/Home";
import Login from "./UI/Login";
import Dashboard from "./UI/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleTouchMove = (event) => {
      // Забороняємо стандартну поведінку свайпів
      event.preventDefault();
    };

    // Додаємо обробник події для свайпів
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Прибираємо обробник при видаленні компонента
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
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
