function TotalEarnings({ items, rate }) {
  // Функція для підрахунку годин
  const calculateTotalHours = (items) => {
    return items.reduce((sum, item) => sum + item.hours, 0);
  };

  // Функція для обчислення грошової суми
  const calculateTotalEarnings = (hours) => {
    return hours * rate;
  };

  // Розділяємо items
  const paidItems = items.filter((item) => item.isPaid);
  const unpaidItems = items.filter((item) => !item.isPaid);

  // Підрахунок годин
  const paidHours = calculateTotalHours(paidItems);
  const unpaidHours = calculateTotalHours(unpaidItems);

  // Обчислення сум
  const totalPaid = calculateTotalEarnings(paidHours);
  const totalUnpaid = calculateTotalEarnings(unpaidHours);

  return (
    <div className="mt-auto p-4 bg-sky-900 text-white">
      <div className="flex justify-between items-center">
        {/* Оплачена частина */}
        <div className="flex flex-col">
          <span className="text-sm opacity-50">Оплачено:</span>
          <span className="text-xs opacity-50">
            {paidHours} год • {totalPaid} €
          </span>
        </div>

        {/* Неоплачена частина */}
        <div className="flex flex-col items-end">
          <span className="text-sm text-green-400">Неоплачено:</span>
          <span className="text-xs text-green-400">
            {unpaidHours} год • {totalUnpaid} €
          </span>
        </div>
      </div>
    </div>
  );
}
export default TotalEarnings;
