import { useState, useEffect } from "react";
import User from "../components/User";
import Form from "../components/Form";
import Items from "../components/Items";
import TotalEarnings from "../components/TotalEarnings";
import { useUser } from "../contexts/UserContext";

function Dashboard() {
  const { user } = useUser(); // Отримуємо дані користувача з контексту

  // Відновлюємо items з localStorage при завантаженні
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Зберігаємо items в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Додавання нового елемента
  const addItem = (newItem) => {
    const itemWithId = { ...newItem, id: Date.now() }; // Додаємо унікальний id
    setItems([...items, itemWithId]);
  };

  return (
    <div className="bg-slate-800 flex flex-col min-h-screen">
      <User />
      <Form addItem={addItem} />
      <Items items={items} setItems={setItems} />

      {/* Передаємо items і ставку з контексту в TotalEarnings */}
      <TotalEarnings items={items} rate={user.hourlyRate} />
    </div>
  );
}

export default Dashboard;
