import { lazy, Suspense } from "react";

import LoadingWheel from "@/components/common/LoadingWheel";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";

const DashBoardSection = lazy(
  () => import("@/components/dashboardPage/DashBoardSection")
);
const DashBoardSectionMobile = lazy(
  () => import("@/components/dashboardPage/DashBoardSectionMobile")
);

import { languageText } from "@/configs/language";
import { useDashboardSection } from "@/hooks/dashboard/useDashboardSection";
import { useLanguageStore } from "@/stores/languageSettingStore";

export default function PracticeDashboardPage() {
  const { lang } = useLanguageStore();
  const { logData } = useDashboardSection();
  return (
    <MainContainer>
      <title>Simply Practice | DashBoard</title>
      <PageHeader title={languageText.common.header.dashboard[lang]} />
      <Suspense fallback={<LoadingWheel />} />
      <DashBoardSection logData={logData} />
      <DashBoardSectionMobile logData={logData} />
    </MainContainer>
  );
}
