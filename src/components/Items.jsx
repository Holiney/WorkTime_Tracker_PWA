import Item from "./Item";

function Items({ items, setItems, onRemove }) {
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
    const month = monthNames[date.getMonth()]; // Отримуємо назву місяця

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

    // Сортуємо всі елементи по даті перед групуванням
    const sortedItems = [...items].sort((a, b) => {
      const dateA = new Date(
        a.date.split(".").reverse().join("-") + `-${new Date().getFullYear()}`
      );
      const dateB = new Date(
        b.date.split(".").reverse().join("-") + `-${new Date().getFullYear()}`
      );
      return dateA - dateB;
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
