import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.name && (parsed.rate || parsed.hourlyRate)) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.warn("❌ Невалідний user у localStorage", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 py-10 text-center">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-3 leading-snug">
          Твій персональний трекер <br />
          <span className="text-blue-600">робочого часу</span> та{" "}
          <span className="text-green-600">заробітку</span>
        </h1>

        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-6 md:p-8 w-full text-left border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Що ти отримаєш:
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            <li>Швидке додавання годин, описів і ставок</li>
            <li>Автоматичний підрахунок суми</li>
            <li>Зручне групування по тижнях або місяцях</li>
            <li>Можливість редагування профілю</li>
            <li>Доступ з будь-якого пристрою</li>
          </ul>

          <button
            onClick={() => navigate("/login")}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-6 rounded-xl shadow transition"
          >
            🚀 Почати зараз
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6">v2.0</p>
      </div>
    </div>
  );
}
