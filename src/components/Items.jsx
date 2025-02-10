import { useEffect } from "react";
import Item from "./Item";

function Items({ items, setItems }) {
  // Видалення елемента
  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Сортування елементів за датою
  const sortItemsByDate = (items) => {
    return items.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Отримуємо відсортовані елементи
  const sortedItems = sortItemsByDate([...items]);

  return (
    <ul className="p-4 space-y-2">
      {sortedItems.map((item) => (
        <Item key={item.id} {...item} onRemove={removeItem} />
      ))}
    </ul>
  );
}

export default Items;
