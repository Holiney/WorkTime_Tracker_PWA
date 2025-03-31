import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useWorkItems } from "../contexts/WorkItemsContext";

export default function AddItemForm() {
  const { user } = useUser();
  const { dispatch } = useWorkItems();

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [hours, setHours] = useState("8");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !hours) return;

    const formattedDate = new Date(date).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    });

    const newItem = {
      id: crypto.randomUUID(),
      date: formattedDate,
      hours: Number(hours),
      description,
      rate: Number(user.rate || user.hourlyRate || 10),
      isPaid: false,
    };

    dispatch({ type: "add", payload: newItem });

    setHours("8");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row bg-white rounded-xl p-4 mt-2 shadow-md gap-2 font-bold"
    >
      <div className="flex justify-between border-b-2 p-2 border-blue-100">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input border-none hover:border-none"
        />
        <select
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="input border-none hover:border-none"
        >
          {[...Array(15)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} год
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Замітка..."
        className="w-full rounded-lg border-b border-gray-300 px-2 py-1"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow"
      >
        Додати
      </button>
    </form>
  );
}
