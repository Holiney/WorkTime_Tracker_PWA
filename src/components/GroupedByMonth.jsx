import { useWorkItems } from "../contexts/WorkItemsContext";
import Item from "./Item";

const MONTH_NAMES = [
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

export default function GroupedByMonth({ view }) {
  const { items, dispatch } = useWorkItems();
  const filtered = items.filter((i) =>
    view === "paid" ? i.isPaid : !i.isPaid
  );

  const grouped = {};

  filtered.forEach((item) => {
    const date = new Date(
      `${item.date}.${new Date().getFullYear()}`.split(".").reverse().join("-")
    );
    const month = MONTH_NAMES[date.getMonth()];
    if (!grouped[month]) grouped[month] = { items: [], total: 0 };

    grouped[month].items.push(item);
    grouped[month].total += item.hours * item.rate;
  });

  const handleRemove = (id) => dispatch({ type: "remove", payload: id });
  const handleTogglePaid = (id) =>
    dispatch({ type: "toggle-paid", payload: id });

  return (
    <ul className="space-y-4">
      {Object.entries(grouped).map(([month, data]) => (
        <div key={month}>
          <h3 className="text-md font-semibold text-blue-700 mb-1">
            {month} — {data.total}€
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
