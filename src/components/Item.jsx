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
      className={`flex justify-between items-center bg-gray-100 p-2 my-2 rounded-lg shadow-sm `}
    >
      <div className="flex items-center">
        <button onClick={() => onTogglePaid(id)} className="mr-2  text-3xl ">
          {isPaid ? "📅" : "✅"}
        </button>
        <div>
          <div className="font-semibold">{date}</div>
          <div className="text-xs text-gray-500">
            {hours} год — {description}
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-green-700 font-light"
      >
        {isPaid ? `Оплачено` : "❌"}
      </button>
    </li>
  );
}

export default Item;
