import DashBoardSection from "@/components/dashboardPage/DashBoardSection";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";
import { languageText } from "@/configs/languageText";
import { useLanguageStore } from "@/stores/LanguageStore";

export default function PracticeDashboardPage() {
  const { lang } = useLanguageStore();
  return (
    <MainContainer>
      <PageHeader title={languageText.header.dashboard[lang]} />
      <DashBoardSection />
    </MainContainer>
  );
}
