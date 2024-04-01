import { Outlet } from "react-router-dom";
import Nav from "../components/NavBar/Nav";

const MainLayout = () => {
  return (
    <div className="font-poppins">
      <Nav />
      <Outlet />
    </div>
  );
};

export default MainLayout;
