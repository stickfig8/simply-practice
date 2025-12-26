import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import SideBar from "./SideBar";

import Footer from "./Footer";
import { lazy, Suspense } from "react";
import LoadingWheel from "../common/LoadingWheel";

const MainPage = lazy(() => import("@/pages/MainPage"));
const PracticePage = lazy(() => import("@/pages/PracticePage"));
const PracticeDashboardPage = lazy(
  () => import("@/pages/PracticeDashboardPage")
);

export default function RouterLayout() {
  const location = useLocation();
  return (
    <div className="App">
      <div className="flex md:flex-row flex-col">
        <SideBar />
        <MobileNav />
        <Suspense fallback={<LoadingWheel />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/dashboard" element={<PracticeDashboardPage />} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}
