function TotalEarnings({ items, rate }) {
  // Функція для обчислення загальної суми зароблених грошей
  const calculateTotalEarnings = () => {
    const totalHours = items.reduce((sum, item) => sum + item.hours, 0);
    return totalHours * rate;
  };

  return (
    <div className="mt-auto p-4 bg-sky-900 text-white">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">Загальна сума:</span>
        <span className="text-lg">{calculateTotalEarnings()} €</span>
      </div>
    </div>
  );
}

export default TotalEarnings;
