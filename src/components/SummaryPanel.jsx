import { useEffect } from "react";

export default function SummaryPanel({
  view,
  setView,
  hours,
  total,
  groupMode,
  setGroupMode,
}) {
  useEffect(() => {
    localStorage.setItem("group-mode", groupMode);
  }, [groupMode]);

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      <div className="flex items-center justify-between w-full">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={groupMode === "week"}
            onChange={() =>
              setGroupMode((prev) => (prev === "week" ? "month" : "week"))
            }
          />
          <div className="w-25 h-8 bg-gray-200 peer-checked:bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-blue-600  peer-checked:text-blue-600  transition-all duration-300">
            {groupMode === "week" ? "Тижні" : "Місяці"}
            <div
              className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                groupMode === "week" ? "translate-x-17" : "translate-x-0"
              }`}
            />
          </div>
        </label>

        <div
          className={`text-sm font-semibold ${
            view === "unpaid" ? "text-green-600" : "text-gray-500"
          }`}
        >
          {hours} год — {total} €
        </div>
      </div>

      <div className="flex w-full gap-2">
        <button
          onClick={() => setView("unpaid")}
          className={`w-1/2 px-3 py-1.5 rounded-full text-sm font-medium transition ${
            view === "unpaid"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          Неоплачені
        </button>
        <button
          onClick={() => setView("paid")}
          className={`w-1/2 px-3 py-1.5 rounded-full text-sm font-medium transition ${
            view === "paid"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          Оплачені
        </button>
      </div>
    </div>
  );
}
