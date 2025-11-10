import { Menu, X } from "lucide-react";
import { useState } from "react";
import ModalBackGround from "./ModalBackGround";
import MobileNavButton from "./MobileNavButton";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

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
            className="w-50 h-full fixed top-0 right-0 z-100 bg-[var(--main-text)] flex flex-col gap-2 pt-5 pr-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-7 h-7 ml-auto"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <MobileNavButton to="/" name="Home" />
            <MobileNavButton to="/practice" name="Practice" />
            <MobileNavButton to="/logs" name="Logs" />
          </div>
        </ModalBackGround>
      )}
    </nav>
  );
}
