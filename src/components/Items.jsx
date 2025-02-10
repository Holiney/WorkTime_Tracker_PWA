import Item from "./Item";

function Items({ items, setItems, onRemove }) {
  const togglePaid = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      )
    );
  };

  // Функція для отримання номера тижня (починаючи з ПОНЕДІЛКА)
  const getWeekNumberInMonth = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstMonday = firstDayOfMonth.getDay(); // 0 - неділя, 1 - понеділок, ..., 6 - субота

    if (firstMonday === 0) firstMonday = 7; // Якщо перше число місяця - неділя, коригуємо до 7
    const daysToMonday = firstMonday === 1 ? 0 : 6 - firstMonday;
    const firstMondayDate = firstDayOfMonth.getDate() + daysToMonday;

    return Math.ceil((date.getDate() - firstMondayDate + 1) / 7) + 1;
  };

  // Функція для групування і сортування елементів по тижнях
  const groupItemsByWeek = (items) => {
    const grouped = {};

    // Сортуємо всі елементи по даті перед групуванням
    const sortedItems = [...items].sort((a, b) => {
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateA - dateB;
    });

    sortedItems.forEach((item) => {
      const date = new Date(item.date.split(".").reverse().join("-"));
      const weekNumber = getWeekNumberInMonth(date);

      if (!grouped[weekNumber]) {
        grouped[weekNumber] = [];
      }
      grouped[weekNumber].push(item);
    });

    // Сортуємо кожен тиждень за датою
    Object.keys(grouped).forEach((week) => {
      grouped[week].sort((a, b) => {
        const dateA = new Date(a.date.split(".").reverse().join("-"));
        const dateB = new Date(b.date.split(".").reverse().join("-"));
        return dateA - dateB;
      });
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
