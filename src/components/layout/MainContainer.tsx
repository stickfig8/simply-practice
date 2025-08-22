import { useSideBarStore } from "@/stores/sideBarStore";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSideBarStore();
  return (
    <main
      className={`w-full px-3 mt-20 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "ml-30" : "ml-0"}`}
    >
      {children}
    </main>
  );
};

export default MainContainer;
