import { useState, useRef } from "react";

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedHours, setSelectedHours] = useState(8);
  const dateInputRef = useRef(null);

  const formattedDate = date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
  });

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value));
  };

  const openDatePicker = () => {
    setTimeout(() => {
      dateInputRef.current?.showPicker();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const itemDescription = description.trim() || "Без заміток";

    const newItem = {
      date: formattedDate,
      hours: selectedHours,
      description: itemDescription,
      isPaid: false,
    };

    addItem(newItem);

    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row bg-white rounded-xl p-4 mb-4 shadow-md gap-2 font-bold"
    >
      <section className="flex justify-between border-b-2 border-blue-100 ">
        <input
          type="date"
          className="input border-none hover:border-none"
          value={date.toISOString().split("T")[0]}
          onChange={handleDateChange}
        />

        <select
          value={selectedHours}
          onChange={(e) => setSelectedHours(Number(e.target.value))}
          className="input border-none hover:border-none"
        >
          {[...Array(15)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} год
            </option>
          ))}
        </select>
      </section>

      <input
        className="input flex-grow border-none hover:border-none"
        type="text"
        placeholder="Замітка..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="bg-sky-700 hover:bg-sky-900 transition-colors text-white py-2 px-4 rounded"
      >
        Додати
      </button>
    </form>
  );
}

export default Form;
