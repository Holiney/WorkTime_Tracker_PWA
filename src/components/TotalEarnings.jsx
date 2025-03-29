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
    <div className="bg-sky-100  p-4 rounded-lg shadow flex justify-between">
      <div>
        <div className="font-bold">Оплачено</div>
        <div>
          {paidHours} год • {totalPaid} €
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">Неоплачено</div>
        <div>
          {unpaidHours} год • {totalUnpaid} €
        </div>
      </div>
    </div>
  );
}
export default TotalEarnings;
