// import Item from "./Item";

// function Items({ items, setItems, onRemove }) {
//   const togglePaid = (id) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isPaid: !item.isPaid } : item
//       )
//     );
//   };

//   // Функція для групування елементів по тижнях
//   const groupItemsByWeek = (items) => {
//     const grouped = {};
//     items.forEach((item) => {
//       const date = new Date(item.date.split(".").reverse().join("-")); // Перетворюємо "дд.мм" на "рррр-мм-дд"
//       const weekStart = new Date(date);
//       weekStart.setDate(date.getDate() - date.getDay()); // Початок тижня (неділя)

//       const weekKey = weekStart.toISOString().split("T")[0]; // Ключ для групування
//       if (!grouped[weekKey]) {
//         grouped[weekKey] = [];
//       }
//       grouped[weekKey].push(item);
//     });
//     return grouped;
//   };

//   const groupedItems = groupItemsByWeek(items);

//   return (
//     <ul className="p-4 space-y-4 ">
//       {Object.entries(groupedItems).map(([weekStart, weekItems]) => (
//         <div key={weekStart} className="flex flex-col gap-1">
//           {/* Відображення лінії розділення та назви тижня */}
//           <div className="flex items-center mb-2">
//             <span className="text-sm text-gray-400">
//               Тиждень{" "}
//               {new Date(weekStart).toLocaleDateString("uk-UA", {
//                 day: "2-digit",
//                 month: "2-digit",
//               })}
//             </span>
//             <div className="flex-grow border-t border-gray-600 ml-2"></div>
//           </div>

//           {/* Відображення елементів тижня */}
//           {weekItems.map((item) => (
//             <Item
//               key={item.id}
//               {...item}
//               onRemove={onRemove}
//               onTogglePaid={togglePaid}
//             />
//           ))}
//         </div>
//       ))}
//     </ul>
//   );
// }

// export default Items;
import Item from "./Item";

function Items({ items, setItems, onRemove }) {
  const togglePaid = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      )
    );
  };

  // Функція для отримання номера тижня в місяці
  const getWeekNumberInMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstWeekDay = firstDayOfMonth.getDay() || 7; // Неділя = 7
    const offset = ((date.getDate() + firstWeekDay - 1) / 7) | 0;
    return offset + 1;
  };

  // Функція для групування елементів по тижнях
  const groupItemsByWeek = (items) => {
    const grouped = {};
    items.forEach((item) => {
      const date = new Date(item.date.split(".").reverse().join("-")); // Перетворюємо "дд.мм" на "рррр-мм-дд"
      const weekNumber = getWeekNumberInMonth(date); // Отримуємо номер тижня в місяці
      if (!grouped[weekNumber]) {
        grouped[weekNumber] = [];
      }
      grouped[weekNumber].push(item);
    });
    return grouped;
  };

  const groupedItems = groupItemsByWeek(items);

  return (
    <ul className="p-4 space-y-4">
      {Object.entries(groupedItems).map(([weekNumber, weekItems]) => (
        <div key={weekNumber} className="flex flex-col gap-1">
          {/* Відображення лінії розділення та назви тижня */}
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-400">Тиждень {weekNumber}</span>
            <div className="flex-grow border-t border-gray-600 ml-2"></div>
          </div>

          {/* Відображення елементів тижня */}
          {weekItems.map((item) => (
            <Item
              key={item.id}
              {...item}
              onRemove={onRemove}
              onTogglePaid={togglePaid}
            />
          ))}
        </div>
      ))}
    </ul>
  );
}

export default Items;
