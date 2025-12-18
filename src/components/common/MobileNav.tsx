import { Menu, X } from "lucide-react";
import { useState } from "react";
import ModalBackGround from "../modals/common/ModalBackGround";
import MobileNavButton from "./MobileNavButton";
import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/LanguageStore";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguageStore();
  return (
    <nav className="sticky top-0 z-15 w-full h-16 flex bg-indigo-800 items-center justify-between px-4 md:hidden block">
      <p className="text-xl font-bold">MyApp</p>
      <button
        className="border-[2px] border-black rounded-[4px] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>
      {isOpen && (
        <ModalBackGround onClose={() => setIsOpen(false)}>
          <div
            className={`w-4 h-[calc(100%-16px)] fixed top-2 right-2 z-100 bg-[var(--main-text)] flex flex-col gap-2 pt-5 px-2 border-1 rounded-[16px] shadow-md transition-all duration-300 ease-in-out ${isOpen ? "w-50" : "w-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-6 h-6 ml-auto"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <MobileNavButton
              to="/"
              name={languageText.common.header.main[lang]}
              onClick={() => setIsOpen(false)}
            />
            <MobileNavButton
              to="/practice"
              name={languageText.common.header.practice[lang]}
              onClick={() => setIsOpen(false)}
            />
            <MobileNavButton
              to="/dashboard"
              name={languageText.common.header.dashboard[lang]}
              onClick={() => setIsOpen(false)}
            />
          </div>
        </ModalBackGround>
      )}
    </nav>
  );
}
