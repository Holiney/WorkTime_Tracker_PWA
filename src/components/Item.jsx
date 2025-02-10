// function Item({ id, date, hours, description, onRemove }) {
//   return (
//     <li className="bg-sky-700 p-2 rounded-lg flex items-center justify-between text-white">
//       <div className="flex  text-left">
//         <span className="font-bold">{date}</span>
//         <span className="ml-2">{hours} год</span>
//       </div>
//       <span className="flex-grow text-center">{description}</span>
//       <button
//         onClick={() => onRemove(id)}
//         className="text-red-500 hover:text-red-700 transition"
//       >
//         ❌
//       </button>
//     </li>
//   );
// }

// export default Item;
function Item({ id, date, hours, description, onRemove }) {
  return (
    <li className="bg-sky-700 p-2 rounded-lg flex items-center justify-between text-white">
      <div className="flex  text-left">
        <span className="font-bold">{date}</span>
        <span className="ml-2">{hours} год</span>
      </div>
      <span className="flex-grow text-center">{description}</span>
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
