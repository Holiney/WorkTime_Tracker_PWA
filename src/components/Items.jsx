import Item from "./Item";

function Items({ items, setItems, onRemove }) {
  const togglePaid = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item
      )
    );
  };

  // Функція для отримання номера тижня у форматі "YYYY-MM-WeekNumber"
  const getWeekKey = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Додаємо 1, бо getMonth() повертає від 0 до 11
    const firstDayOfMonth = new Date(year, date.getMonth(), 1);
    const firstMonday =
      firstDayOfMonth.getDay() === 1
        ? firstDayOfMonth
        : new Date(
            year,
            date.getMonth(),
            1 + ((6 - firstDayOfMonth.getDay()) % 7)
          );

    const daysSinceFirstMonday = (date - firstMonday) / (1000 * 60 * 60 * 24);
    const weekNumber = Math.floor(daysSinceFirstMonday / 7) + 1;

    return `${year}-${month.toString().padStart(2, "0")}-Тиждень ${weekNumber}`;
  };

  // Функція для групування та сортування елементів по тижнях
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
      const weekKey = getWeekKey(date);

      if (!grouped[weekKey]) {
        grouped[weekKey] = [];
      }
      grouped[weekKey].push(item);
    });

    return grouped;
  };

  const groupedItems = groupItemsByWeek(items);

  return (
    <ul className="p-4 space-y-4">
      {Object.entries(groupedItems).map(([weekKey, weekItems]) => (
        <div key={weekKey} className="flex flex-col gap-1">
          {/* Відображення лінії розділення та назви тижня */}
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-400">{weekKey}</span>
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
