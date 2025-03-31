import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#e9eff6] pt-12">
      <Header />
      <main className="py-4 max-w-md mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
