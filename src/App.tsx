import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PracticePage from "./pages/PracticePage";
import SideBar from "./components/layout/SideBar";
import MobileNav from "./components/layout/MobileNav";
import PracticeDashboardPage from "./pages/PracticeDashboardPage";
import Footer from "./components/layout/Footer";
import { useBrowserLanguage } from "./hooks/common/useBrowserLanguage";

function App() {
  useBrowserLanguage();
  return (
    <BrowserRouter>
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
