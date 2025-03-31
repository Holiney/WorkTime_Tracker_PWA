import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8f0ff] p-4">
      <Outlet />
    </div>
  );
}
