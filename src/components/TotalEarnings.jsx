// function TotalEarnings({ items, rate }) {
//   // Функція для обчислення загальної суми зароблених грошей
//   const calculateTotalEarnings = () => {
//     const totalHours = items.reduce((sum, item) => sum + item.hours, 0);
//     return totalHours * rate;
//   };

//   return (
//     <div className="mt-auto p-4 bg-sky-900 text-white">
//       <div className="flex justify-between items-center">
//         <span className="text-lg font-bold">Загальна сума:</span>
//         <span className="text-lg">{calculateTotalEarnings()} €</span>
//       </div>
//     </div>
//   );
// }

// export default TotalEarnings;
function TotalEarnings({ items, rate }) {
  // Функція для обчислення загальної суми зароблених грошей
  const calculateTotalEarnings = (items) => {
    const totalHours = items.reduce((sum, item) => sum + item.hours, 0);
    return totalHours * rate;
  };

  // Розділяємо items на оплачені та неоплачені
  const paidItems = items.filter((item) => item.isPaid);
  const unpaidItems = items.filter((item) => !item.isPaid);

  // Обчислюємо суми для оплачених та неоплачених
  const totalPaid = calculateTotalEarnings(paidItems);
  const totalUnpaid = calculateTotalEarnings(unpaidItems);

  return (
    <div className="mt-auto p-4 bg-sky-900 text-white">
      <div className="flex justify-between items-center">
        {/* Оплачено: сірий відтінок */}
        <span className="text-sm opacity-50 font-semibold">
          Оплачено: {totalPaid} €
        </span>

        {/* Неоплачено: яскравий колір */}
        <span className="text-sm text-green-400 font-semibold">
          Неоплачено: {totalUnpaid} €
        </span>
      </div>
    </div>
  );
}

export default TotalEarnings;
