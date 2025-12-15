import { useSideBarStore } from "@/stores/sideBarStore";
import SideBarButton from "./SideBarButton";
import { useLanguageStore } from "@/stores/LanguageStore";
import { languageText } from "@/configs/languageText";
import { Languages } from "lucide-react";

export default function SideBar() {
  const { isOpen, setIsOpen } = useSideBarStore();
  const { lang } = useLanguageStore();
  return (
    <nav
      className={`fixed inset-0 h-screen bg-indigo-800 transition-all duration-300 ease-in-out ${isOpen ? "w-30" : "w-0"} md:block hidden z-15`}
    >
      <div className="flex items-center justify-center h-16 px-4 border-1">
        <button
          className="text-xl font-bold cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          MyApp
        </button>
      </div>

      <aside
        className={`
          p-4 flex flex-col h-full justify-between transform transition-all duration-300 ease-in-out border-1
          ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-30"}
          
        `}
      >
        <div className="flex flex-col gap-4 h-fit border-1">
          <SideBarButton to="/" name={languageText.header.home[lang]} />
          <SideBarButton
            to="/practice"
            name={languageText.header.practice[lang]}
          />
          <SideBarButton
            to="/dashboard"
            name={languageText.header.dashboard[lang]}
          />
        </div>
        <SideBarButton
          to="/dashboard"
          name={languageText.header.dashboard[lang]}
        />
      </aside>
    </nav>
  );
}
