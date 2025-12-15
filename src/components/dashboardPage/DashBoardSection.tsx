import PracticeDaysCard from "./PracticeDaysCard";
import { useDashboardSection } from "@/hooks/useDashboardSection";

export default function DashBoardSection() {
  const { logData } = useDashboardSection();
  return (
    <section className="w-full h-fit flex flex-col gap-10">
      <PracticeDaysCard logData={logData} />
    </section>
  );
}
