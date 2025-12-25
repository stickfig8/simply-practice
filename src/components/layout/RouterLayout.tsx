import { Route, Routes, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import SideBar from "./SideBar";
import MainPage from "@/pages/MainPage";
import PracticePage from "@/pages/PracticePage";
import PracticeDashboardPage from "@/pages/PracticeDashboardPage";
import Footer from "./Footer";

export default function RouterLayout() {
  const location = useLocation();
  return (
    <div className="App">
      <div className="flex md:flex-row flex-col">
        <SideBar />
        <MobileNav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/dashboard" element={<PracticeDashboardPage />} />
        </Routes>
      </div>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}
