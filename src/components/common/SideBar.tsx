import { useSideBarStore } from "@/stores/sideBarStore";
import SideBarButton from "./SideBarButton";
import { useLanguageStore } from "@/stores/LanguageStore";
import { languageText } from "@/configs/language/commonText";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function SideBar() {
  const { isOpen, setIsOpen } = useSideBarStore();
  const { lang, setLang } = useLanguageStore();

  const languages = [
    { code: "kor", label: "한국어" },
    { code: "eng", label: "English" },
    { code: "jpn", label: "日本語" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 h-16 w-30 bg-indigo-800 md:flex hidden items-center justify-center z-20">
        <button
          className="text-xl font-bold text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          MyApp
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

          <div className="flex items-center justify-center border-t border-indigo-600 pt-3 mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-white hover:text-indigo-200 transition cursor-pointer">
                  <Languages size={18} />
                  <span>{languages.find((l) => l.code === lang)?.label}</span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={10}
                alignOffset={-10}
                className="bg-white text-black rounded-md shadow-md"
              >
                {languages.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code as "kor" | "eng" | "jpn")}
                    className={`cursor-pointer ${
                      lang === l.code ? "bg-indigo-100 text-indigo-700" : ""
                    }`}
                  >
                    {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>
      </nav>
    </>
  );
}
