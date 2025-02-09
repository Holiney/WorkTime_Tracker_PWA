import { useState } from "react";

function Form() {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedHours, setSelectedHours] = useState(8);

  // Форматуємо дату у форматі "день.місяць"
  const formattedDate = date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <form className="bg-sky-600 p-4 rounded-lg shadow-md flex flex-col space-y-4">
      {/* Рядок з датою та вибором годин */}
      <div className="flex items-center space-x-4">
        {/* Відображення дати */}
        <div className="bg-sky-800 p-2 rounded-lg text-white flex items-center">
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="ml-2 bg-transparent text-white"
          />
        </div>

        {/* Вибір годин */}
        <select
          value={selectedHours}
          onChange={(e) => setSelectedHours(Number(e.target.value))}
          className="bg-blue-800 p-2 rounded-lg text-white"
        >
          {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Поле для замітки */}
      <input
        className="bg-cyan-800 p-2 rounded-lg text-white placeholder-gray-300"
        type="text"
        placeholder="Замітка..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Кнопка "Add" */}
      <button className="bg-green-500 p-2 rounded-lg text-white hover:bg-green-600 transition-colors">
        Add
      </button>
    </form>
  );
}

export default Form;
