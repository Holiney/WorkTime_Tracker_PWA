import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Login() {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [hourlyRate, setHourlyRate] = useState(user?.hourlyRate || 10);
  const navigate = useNavigate();

  const rates = Array.from({ length: 20 }, (_, index) => index + 6);

  useEffect(() => {
    if (user && user.name && user.hourlyRate) {
      navigate("/Dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, hourlyRate });
    navigate("/Dashboard");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
        Логін
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Ім’я</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введіть ваше ім’я"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Сума за годину
          </label>
          <select
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Виберіть ставку</option>
            {rates.map((rate) => (
              <option key={rate} value={rate}>
                {rate}€/год
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <Button>Увійти</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
