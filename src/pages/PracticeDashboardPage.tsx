import DashBoardSection from "@/components/dashboardPage/DashBoardSection";
import DashBoardSectionMobile from "@/components/dashboardPage/DashBoardSectionMobile";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";
import { languageText } from "@/configs/language/commonText";
import { useDashboardSection } from "@/hooks/dashboard/useDashboardSection";
import { useLanguageStore } from "@/stores/LanguageStore";

export default function PracticeDashboardPage() {
  const { lang } = useLanguageStore();
  const { logData } = useDashboardSection();
  return (
    <MainContainer>
      <PageHeader title={languageText.header.dashboard[lang]} />
      <DashBoardSection logData={logData} />
      <DashBoardSectionMobile logData={logData} />
    </MainContainer>
  );
}
