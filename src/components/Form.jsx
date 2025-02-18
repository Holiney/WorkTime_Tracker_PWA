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
      className="bg-sky-800 p-1 rounded-xl shadow-md flex items-center flex-nowrap overflow-hidden"
    >
      <div className="p-4 rounded-lg text-white flex items-center relative">
        <span
          className="text-lg font-bold cursor-pointer"
          onClick={openDatePicker}
        >
          {formattedDate}
        </span>
        <input
          type="date"
          ref={dateInputRef}
          value={date.toISOString().split("T")[0]}
          onChange={handleDateChange}
          className="absolute opacity-0 w-0 h-0"
        />
      </div>

      <select
        value={selectedHours}
        onChange={(e) => setSelectedHours(Number(e.target.value))}
        className="p-2 rounded-lg text-white text-sm bg-sky-800 w-20"
      >
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num} год
          </option>
        ))}
      </select>

      <input
        className="p-2 min-w-5 rounded-lg text-white placeholder-gray-300 flex-grow text-sm"
        type="text"
        placeholder="Замітка..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="p-2 mr-2 bg-cyan-600 rounded-lg text-white hover:bg-green-600 transition-colors text-sm"
      >
        Додати
      </button>
    </form>
  );
}

export default Form;
