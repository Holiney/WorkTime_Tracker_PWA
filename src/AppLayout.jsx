import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#e9eff6] pt-12">
      <main className="py-4 max-w-md mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
