import PropTypes from "prop-types";

function Item({
  id,
  date,
  hours,
  rate,
  description,
  isPaid,
  onRemove,
  onTogglePaid,
}) {
  const getDayOfWeek = (dateString) => {
    const days = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
    const currentYear = new Date().getFullYear();
    const date = new Date(
      `${dateString}.${currentYear}`.split(".").reverse().join("-")
    );
    return days[date.getDay()];
  };

  const dayOfWeek = getDayOfWeek(date);
  const total = hours * rate;

  return (
    <li className="flex justify-between items-center bg-white p-3 my-1 rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={() => onTogglePaid(id)} className="text-xl">
          {isPaid ? "📅" : "✅"}
        </button>
        <div className="flex">
          <div className="flex flex-col min-w-20">
            <div className="font-semibold text-gray-800 text-sm">
              {date} {dayOfWeek}
            </div>
            <div className="text-xs text-gray-500">
              {hours}год | {total}€
            </div>
          </div>
          <div className="flex items-center">
            {description || "Без заміток"}
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(id)}
        className={`text-sm ${
          isPaid ? "text-green-600" : "text-red-500 text-xl"
        }`}
      >
        {isPaid ? `Оплачено` : "×"}
      </button>
    </li>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hours: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  description: PropTypes.string,
  isPaid: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  onTogglePaid: PropTypes.func.isRequired,
};

export default Item;
