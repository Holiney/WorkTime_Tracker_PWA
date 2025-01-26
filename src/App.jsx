import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">React Клікер</h1>
      <p className="text-lg mb-4">
        Кількість кліків: <span className="font-bold">{count}</span>
      </p>
      <button
        type="button"
        onClick={handleClick}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition"
      >
        Клікнути
      </button>
    </div>
  );
};

export default App;
