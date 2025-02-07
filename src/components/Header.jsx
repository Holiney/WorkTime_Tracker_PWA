import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-center font-serif bg-sky-600 px-4 py-3  border-b border-sky-950 sm:px-6">
      <Link to="/" className="tracking-widest">
        WorkTime Tracker
      </Link>
    </header>
  );
}

export default Header;
