import { useSideBarStore } from "@/stores/sideBarStore";
import SideBarButton from "./SideBarButton";
import { useLanguageStore } from "@/stores/languageStore";
import { languageText } from "@/configs/language";

import LanguageButton from "./LanguageButton";

export default function SideBar() {
  const { isOpen, setIsOpen } = useSideBarStore();
  const { lang } = useLanguageStore();

  return (
    <>
      <div className="fixed top-0 left-0 h-16 w-30 md:flex hidden items-center justify-center z-20">
        <button
          className="text-xl font-bold text-white cursor-pointer px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img className="h-full" src="/images/logo.png" />
        </button>
      </div>

      <nav
        className={`fixed top-0 left-0 h-screen bg-indigo-800 transition-all duration-300 ease-in-out z-15 md:block hidden ${
          isOpen ? "w-30" : "w-0"
        }`}
      >
        <aside
          className={`
            p-4 flex flex-col h-full justify-between transform transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-30"}
          `}
        >
          <div className="flex flex-col gap-4 mt-16">
            <SideBarButton
              to="/"
              name={languageText.common.header.home[lang]}
            />
            <SideBarButton
              to="/practice"
              name={languageText.common.header.practice[lang]}
            />
            <SideBarButton
              to="/dashboard"
              name={languageText.common.header.dashboard[lang]}
            />
          </div>

          <LanguageButton isMobile={false} />
        </aside>
      </nav>
    </>
  );
}
