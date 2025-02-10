function Item({
  id,
  date,
  hours,
  description,
  isPaid,
  onRemove,
  onTogglePaid,
}) {
  // Функція для отримання дня тижня (пн, вт, ср, чт, пт, сб, нд)
  const getDayOfWeek = (dateString) => {
    const days = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
    const currentYear = new Date().getFullYear(); // Отримуємо поточний рік
    const date = new Date(
      `${dateString}.${currentYear}`.split(".").reverse().join("-")
    ); // Формат "рррр-мм-дд"
    return days[date.getDay()];
  };

  return (
    <li
      className={`bg-sky-700 p-2 rounded-lg flex items-center justify-between text-white ${
        isPaid ? "opacity-50" : ""
      }`}
    >
      <button
        onClick={() => onTogglePaid(id)}
        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm mr-2"
      >
        {isPaid ? "✅" : "💵"}
      </button>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span className="font-bold">{date}</span>
          <span className="text-sm text-gray-300">{getDayOfWeek(date)}</span>
        </div>
        <span className="text-sm">{hours} год</span>
      </div>
      <span className="flex-grow text-center">{description}</span>
      {/* Надпис "Оплачено" для оплачених елементів */}
      {isPaid && <span className="text-sm text-gray-300 mr-2">Оплачено</span>}

      <button
        onClick={() => onRemove(id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        ❌
      </button>
    </li>
  );
}

export default Item;
