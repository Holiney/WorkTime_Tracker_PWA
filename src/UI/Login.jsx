import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
function Login() {
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const rates = Array.from({ length: 20 }, (_, index) => index + 6);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name && user.hourlyRate) {
      navigate("/Dashboard");
    }
  });

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
          <label className="block text-gray-700 font-medium mb-2">Ім`я</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введіть ваше ім'я"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Сума за годину
          </label>
          <select
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Виберіть ставку</option>
            {rates.map((rate, index) => (
              <option key={index} value={rate}>
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
