import { useState, useEffect } from "react";
import User from "../components/User";
import Form from "../components/Form";
import Items from "../components/Items";
import TotalEarnings from "../components/TotalEarnings";
import { useUser } from "../contexts/UserContext";

function Dashboard() {
  const { user } = useUser();

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    const itemWithId = { ...newItem, id: Date.now(), isPaid: false };
    setItems([...items, itemWithId]);
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-blue-100 flex px-5 flex-col min-h-screen h-screen grid-rows-[auto_1fr_auto]">
      <User />
      <Form addItem={addItem} />

      <main className="overflow-scroll">
        <Items items={items} setItems={setItems} onRemove={removeItem} />
      </main>

      <TotalEarnings items={items} rate={user.hourlyRate} />
    </div>
  );
}

export default Dashboard;
