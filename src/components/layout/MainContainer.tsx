import { useSideBarStore } from "@/stores/sideBarStore";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSideBarStore();

  return (
    <main
      className={`relative w-full h-screen px-3 py-5 space-y-4 md:pt-20 pt-6 transition-all duration-300 ease-in-out ${isOpen ? "ml-0 md:ml-30" : "ml-0"}`}
    >
      {children}
    </main>
  );
};

export default MainContainer;
