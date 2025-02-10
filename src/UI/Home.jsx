import { Link } from "react-router-dom";
import Header from "../components/Header";
function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">
          Легкий спосіб відслідковувати робочі години та заробіток v0.52
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Як це працює?</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-10">
          <li className="text-lg">
            Введіть деталі роботи: Назва, Опис, Ставка, Години
          </li>
          <li className="text-lg">Автоматичний розрахунок заробітку</li>
          <li className="text-lg">
            Зберігання історії робіт для подальшого перегляду
          </li>
        </ol>
        <Link
          to="/login"
          className="bg-sky-800 text-white uppercase py-3 px-6 font-inherit text-xl font-bold border-0 rounded-[8px] cursor-pointer self-center"
        >
          Почати використовувати
        </Link>
      </main>
    </>
  );
}

export default Home;
