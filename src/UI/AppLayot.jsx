import { Outlet } from "react-router-dom";
import Header from "../components/Header";
function AppLayot() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayot;
