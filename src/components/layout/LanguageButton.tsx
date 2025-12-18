import { useLanguageStore } from "@/stores/LanguageStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Languages } from "lucide-react";

type Props = {
  isMobile: boolean;
};
export default function LanguageButton({ isMobile }: Props) {
  const { lang, setLang } = useLanguageStore();
  const languages = [
    { code: "kor", label: "한국어" },
    { code: "eng", label: "English" },
    { code: "jpn", label: "日本語" },
  ];
  return (
    <div className="flex items-center justify-center border-t border-indigo-600 pt-3 mt-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`flex items-center gap-2 text-${isMobile ? "black" : "gray-200"} hover:text-indigo-200 transition cursor-pointer`}
          >
            <Languages size={18} />
            <span>{languages.find((l) => l.code === lang)?.label}</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="end"
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
  );
}
