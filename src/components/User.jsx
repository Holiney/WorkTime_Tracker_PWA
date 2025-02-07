import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function User() {
  const { user, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newRate, setNewRate] = useState(user.hourlyRate);
  const navigate = useNavigate();

  if (!user)
    return <p className="text-center text-gray-500">Не авторизований</p>;

  const handleEdit = () => {
    setIsEditModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleSaveEdit = () => {
    if (newName && newRate) {
      setUser({ ...user, name: newName, hourlyRate: newRate });
    }
    setIsEditModalOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsMenuOpen(false);
  };

  const confirmLogout = () => {
    setUser({ name: "", hourlyRate: 10 });
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <div className="flex items-center gap-4 justify-between bg-gray-900 text-white px-4 py-2 shadow-lg relative">
      <img
        src={`https://i.pravatar.cc/100?u=${user.name}`}
        alt="User Avatar"
        className="rounded-full h-12 w-12 border-2 border-gray-600"
      />

      <span className="text-lg font-semibold">{user.name}</span>
      <span className="text-sm text-gray-300">{user.hourlyRate}€/год</span>

      {/* Бургер-іконка */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Випадаюче меню */}
      {isMenuOpen && (
        <div className="absolute right-0 top-14 bg-white text-gray-800 rounded-lg shadow-lg w-48">
          <button
            onClick={handleEdit}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Редагувати профіль
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Вийти
          </button>
        </div>
      )}

      {/* Модальне вікно редагування */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Редагування профілю
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Ім'я
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="Введіть ваше ім'я"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Ставка за годину
                </label>
                <select
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                >
                  {Array.from({ length: 20 }, (_, index) => index + 6).map(
                    (rate) => (
                      <option key={rate} value={rate}>
                        {rate}€/год
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Скасувати
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Зберегти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальне вікно підтвердження виходу */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Підтвердження виходу</h2>
            <p className="text-gray-700 mb-6">Ви впевнені, що хочете вийти?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Скасувати
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
