import { useWorkItems } from "../contexts/WorkItemsContext";
import PropTypes from "prop-types";
import Item from "./Item";

const getWeekInfo = (date) => {
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

  const key = `${date.getFullYear()}-${date.getMonth() + 1}-week${weekNumber}`;
  return {
    key,
    startDate: new Date(firstMonday.getTime() + weekNumber * 7 * 86400000),
  };
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
    const { key, startDate } = getWeekInfo(date);

    if (!grouped[key]) {
      grouped[key] = {
        items: [],
        total: 0,
        startDate,
      };
    }

    grouped[key].items.push(item);
    grouped[key].total += item.hours * item.rate;
  });

  const sortedGroups = Object.entries(grouped).sort(
    (a, b) => b[1].startDate - a[1].startDate
  );

  const handleRemove = (id) => dispatch({ type: "remove", payload: id });
  const handleTogglePaid = (id) =>
    dispatch({ type: "toggle-paid", payload: id });

  return (
    <ul className="space-y-4">
      {sortedGroups.map(([groupKey, data]) => (
        <div key={groupKey}>
          <h3 className="text-sm text-gray-600 font-medium mb-1">
            Тиждень — {data.total} €
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

      {sortedGroups.length === 0 && (
        <p className="text-center text-gray-400">
          {view === "paid"
            ? "❌ Оплачених записів немає."
            : "✅ Усі записи оплачені!"}
        </p>
      )}
    </ul>
  );
}

// ✅ Додаємо проп тайпи
GroupedByWeek.propTypes = {
  view: PropTypes.oneOf(["paid", "unpaid"]).isRequired,
};
