import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PracticePage from "./pages/PracticePage";
import SideBar from "./components/common/SideBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App flex flex-row">
        <SideBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/practice" element={<PracticePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
