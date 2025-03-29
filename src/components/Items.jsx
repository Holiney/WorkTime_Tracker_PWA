// import Item from "./Item";

// function Items({ items, setItems, onRemove }) {
//   const togglePaid = (id) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isPaid: !item.isPaid } : item
//       )
//     );
//   };

//   // Функція для отримання ключа тижня у форматі "Місяць X, Тиждень Y"
//   const getWeekKey = (date) => {
//     const monthNames = [
//       "Січень",
//       "Лютий",
//       "Березень",
//       "Квітень",
//       "Травень",
//       "Червень",
//       "Липень",
//       "Серпень",
//       "Вересень",
//       "Жовтень",
//       "Листопад",
//       "Грудень",
//     ];
//     const month = monthNames[date.getMonth()]; // Отримуємо назву місяця

//     // Знаходимо перший понеділок місяця
//     const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     const firstMonday =
//       firstDayOfMonth.getDay() === 1
//         ? firstDayOfMonth
//         : new Date(
//             date.getFullYear(),
//             date.getMonth(),
//             1 + ((8 - firstDayOfMonth.getDay()) % 7)
//           );

//     // Обчислюємо різницю в днях між поточною датою та першим понеділком
//     const daysSinceFirstMonday = Math.floor(
//       (date - firstMonday) / (1000 * 60 * 60 * 24)
//     );

//     // Номер тижня починається з 1
//     const weekNumber = Math.floor(daysSinceFirstMonday / 7) + 1;

//     return `${month}, Тиждень ${weekNumber}`;
//   };

//   // Функція для групування та сортування елементів по тижнях
//   const groupItemsByWeek = (items) => {
//     const grouped = {};

//     // Сортуємо всі елементи по даті перед групуванням
//     const sortedItems = [...items].sort((a, b) => {
//       const dateA = new Date(
//         a.date.split(".").reverse().join("-") + `-${new Date().getFullYear()}`
//       );
//       const dateB = new Date(
//         b.date.split(".").reverse().join("-") + `-${new Date().getFullYear()}`
//       );
//       return dateB - dateA;
//     });

//     sortedItems.forEach((item) => {
//       const date = new Date(
//         item.date.split(".").reverse().join("-") +
//           `-${new Date().getFullYear()}`
//       );
//       const weekKey = getWeekKey(date);

//       if (!grouped[weekKey]) {
//         grouped[weekKey] = [];
//       }
//       grouped[weekKey].push(item);
//     });

//     return grouped;
//   };

//   const groupedItems = groupItemsByWeek(items);

//   return (
//     <ul className="space-y-4">
//       {Object.entries(groupedItems).map(([weekKey, weekItems]) => (
//         <div key={weekKey}>
//           <h3 className="font-medium ">{weekKey}</h3>
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
import { useState } from "react";
import Item from "./Item";

function Items({ items, setItems, onRemove }) {
  const [activeTab, setActiveTab] = useState("unpaid"); // 👈 Вкладки (оплачені/неоплачені)

  const togglePaid = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      )
    );
  };

  // Функція для отримання ключа тижня у форматі "Місяць X, Тиждень Y"
  const getWeekKey = (date) => {
    const monthNames = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];
    const month = monthNames[date.getMonth()];

    // Знаходимо перший понеділок місяця
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstMonday =
      firstDayOfMonth.getDay() === 1
        ? firstDayOfMonth
        : new Date(
            date.getFullYear(),
            date.getMonth(),
            1 + ((8 - firstDayOfMonth.getDay()) % 7)
          );

    // Обчислюємо різницю в днях між поточною датою та першим понеділком
    const daysSinceFirstMonday = Math.floor(
      (date - firstMonday) / (1000 * 60 * 60 * 24)
    );

    // Номер тижня починається з 1
    const weekNumber = Math.floor(daysSinceFirstMonday / 7) + 1;

    return `${month}, Тиждень ${weekNumber}`;
  };

  // Функція для групування та сортування елементів по тижнях
  const groupItemsByWeek = (items) => {
    const grouped = {};

    // Сортуємо всі елементи по даті (нові вгорі)
    const sortedItems = [...items].sort((a, b) => {
      const dateA = new Date(
        a.date.split(".").reverse().join("-") + `-${new Date().getFullYear()}`
      );
      const dateB = new Date(
        b.date.split(".").reverse().join("-") + `-${new Date().getFullYear()}`
      );
      return dateB - dateA;
    });

    sortedItems.forEach((item) => {
      const date = new Date(
        item.date.split(".").reverse().join("-") +
          `-${new Date().getFullYear()}`
      );
      const weekKey = getWeekKey(date);

      if (!grouped[weekKey]) {
        grouped[weekKey] = [];
      }
      grouped[weekKey].push(item);
    });

    return grouped;
  };

  const groupedUnpaidItems = groupItemsByWeek(
    items.filter((item) => !item.isPaid)
  );
  const groupedPaidItems = groupItemsByWeek(
    items.filter((item) => item.isPaid)
  );

  return (
    <div className="px-4">
      {/* 🔹 Вкладки */}
      <div className="flex mb-4 border-b border-gray-300">
        <button
          className={`px-1 py-1 w-1/2 ${
            activeTab === "unpaid"
              ? "border-b-2 border-blue-500 font-bold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("unpaid")}
        >
          Не оплачене ({Object.keys(groupedUnpaidItems).length})
        </button>
        <button
          className={`px-1 py-1 w-1/2 ${
            activeTab === "paid"
              ? "border-b-4 border-green-500 font-bold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("paid")}
        >
          Оплачене ({Object.keys(groupedPaidItems).length})
        </button>
      </div>

      {/* 🔹 Контент вкладок */}
      <ul className="space-y-4">
        {activeTab === "unpaid" &&
          Object.entries(groupedUnpaidItems).map(([weekKey, weekItems]) => (
            <div key={weekKey}>
              <h3 className="font-medium">{weekKey}</h3>
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

        {activeTab === "paid" &&
          Object.entries(groupedPaidItems).map(([weekKey, weekItems]) => (
            <div key={weekKey}>
              <h3 className="font-medium">{weekKey}</h3>
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

        {/* 🔹 Якщо немає записів у вибраній вкладці */}
        {activeTab === "unpaid" &&
          Object.keys(groupedUnpaidItems).length === 0 && (
            <p className="text-gray-500 text-center">✅ Усі записи оплачені!</p>
          )}
        {activeTab === "paid" && Object.keys(groupedPaidItems).length === 0 && (
          <p className="text-gray-500 text-center">
            ❌ Оплачених записів немає.
          </p>
        )}
      </ul>
    </div>
  );
}

export default Items;
