import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-center bg-gray-900 text-white px-3 py-3 shadow-lg relative">
      <Link to="/" className="tracking-widest">
        WorkTime
      </Link>
    </header>
  );
}

export default Header;
