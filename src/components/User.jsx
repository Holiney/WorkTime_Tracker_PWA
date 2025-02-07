import { useUser } from "../contexts/UserContext";

function User() {
  const { user } = useUser();
  if (!user)
    return <p className="text-center text-gray-500">Не авторизований</p>;

  return (
    <div className="flex items-center gap-4 justify-between bg-gray-900 text-white px-4 py-2 shadow-lg">
      <img
        src="https://i.pravatar.cc/100?u=zw"
        alt="User Avatar"
        className="rounded-full h-12 w-12 border-2 border-gray-600"
      />

      <span className="text-lg font-semibold">{user.name}</span>
      <span className="text-sm text-gray-300">{user.hourlyRate}€/год</span>
    </div>
  );
}

export default User;
