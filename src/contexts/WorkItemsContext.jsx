import { createContext, useContext, useEffect, useReducer } from "react";

const WorkItemsContext = createContext();

function workItemsReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "remove":
      return state.filter((item) => item.id !== action.payload);

    case "toggle-paid":
      return state.map((item) =>
        item.id === action.payload ? { ...item, isPaid: !item.isPaid } : item
      );

    case "load":
      return action.payload;
    case "reset":
      return [];
    default:
      return state;
  }
}

function initWorkItems() {
  try {
    const stored = localStorage.getItem("work-items");
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("❌ Не вдалося прочитати work-items з localStorage:", err);
    return [];
  }
}

export function WorkItemsProvider({ children }) {
  const [items, dispatch] = useReducer(workItemsReducer, [], initWorkItems);

  useEffect(() => {
    localStorage.setItem("work-items", JSON.stringify(items));
  }, [items]);

  const summary = items.reduce(
    (acc, item) => {
      const total = item.hours * item.rate;
      if (item.isPaid) {
        acc.paid.hours += item.hours;
        acc.paid.total += total;
      } else {
        acc.unpaid.hours += item.hours;
        acc.unpaid.total += total;
      }
      return acc;
    },
    {
      paid: { hours: 0, total: 0 },
      unpaid: { hours: 0, total: 0 },
    }
  );

  return (
    <WorkItemsContext.Provider value={{ items, dispatch, summary }}>
      {children}
    </WorkItemsContext.Provider>
  );
}

export function useWorkItems() {
  return useContext(WorkItemsContext);
}
