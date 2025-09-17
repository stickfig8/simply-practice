import { useLocation } from "react-router-dom";

export default function PageHeader() {
  const pathName = useLocation().pathname;
  return (
    <header className="sticky top-0 w-full flex justify-center items-center h-16 z-10 bg-white">
      <h3 className="text-lg font-semibold">
        {pathName.charAt(1).toUpperCase() + pathName.slice(2)}
      </h3>
    </header>
  );
}
