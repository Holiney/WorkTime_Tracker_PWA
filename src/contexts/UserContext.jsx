import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Відновлюємо дані користувача з localStorage або встановлюємо значення за замовчуванням
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { name: "", hourlyRate: 10, avatar: "icon2.png" }; // Додано avatar за замовчуванням
  });

  // Зберігаємо дані користувача в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
