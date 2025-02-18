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
      // Перевіряємо, чи елемент, по якому йде свайп, дозволяє скрол
      if (!event.target.closest(".no-scroll")) {
        return; // Якщо це не спеціальний елемент, не блокуємо скрол
      }
      event.preventDefault(); // Інакше блокуємо
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

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
