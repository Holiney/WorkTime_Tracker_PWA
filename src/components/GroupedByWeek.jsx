import { useWorkItems } from "../contexts/WorkItemsContext";
import Item from "./Item";

// Отримуємо ключ тижня
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

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstMonday =
    firstDayOfMonth.getDay() === 1
      ? firstDayOfMonth
      : new Date(
          date.getFullYear(),
          date.getMonth(),
          1 + ((8 - firstDayOfMonth.getDay()) % 7)
        );

  const daysSinceFirstMonday = Math.floor(
    (date - firstMonday) / (1000 * 60 * 60 * 24)
  );
  const weekNumber = Math.floor(daysSinceFirstMonday / 7) + 1;

  return `${month}, Тиждень ${weekNumber}`;
};

export default function GroupedByWeek({ view }) {
  const { items, dispatch } = useWorkItems();
  const filtered = items.filter((i) =>
    view === "paid" ? i.isPaid : !i.isPaid
  );

  const grouped = {};

  filtered.forEach((item) => {
    const date = new Date(
      `${item.date}.${new Date().getFullYear()}`.split(".").reverse().join("-")
    );
    const key = getWeekKey(date);
    if (!grouped[key]) grouped[key] = { items: [], total: 0 };

    grouped[key].items.push(item);
    grouped[key].total += item.hours * item.rate;
  });

  const handleRemove = (id) => dispatch({ type: "remove", payload: id });
  const handleTogglePaid = (id) =>
    dispatch({ type: "toggle-paid", payload: id });

  return (
    <ul className="space-y-4">
      {Object.entries(grouped).map(([weekKey, data]) => (
        <div key={weekKey}>
          <h3 className="text-sm text-gray-600 font-medium mb-1">
            {weekKey} — {data.total}€
          </h3>
          {data.items.map((item) => (
            <Item
              key={item.id}
              {...item}
              onRemove={handleRemove}
              onTogglePaid={handleTogglePaid}
            />
          ))}
        </div>
      ))}

      {Object.keys(grouped).length === 0 && (
        <p className="text-center text-gray-400">
          {view === "paid"
            ? "❌ Оплачених записів немає."
            : "✅ Усі записи оплачені!"}
        </p>
      )}
    </ul>
  );
}
