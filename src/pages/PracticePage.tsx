import { lazy, Suspense } from "react";

import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/layout/PageHeader";

const Waveform = lazy(() => import("@/components/practicePage/Waveform"));
const FunctionalButtons = lazy(
  () => import("@/components/practicePage/FunctionalButtons")
);
const FunctionalCarousel = lazy(
  () => import("@/components/practicePage/FunctionalCarousel")
);
const SaveModal = lazy(() => import("@/components/modals/SaveModal"));

import { languageText } from "@/configs/language";
import { useLanguageStore } from "@/stores/languageSettingStore";
import LoadingWheel from "@/components/common/LoadingWheel";

export default function PracticePage() {
  const { lang } = useLanguageStore();
  return (
    <MainContainer>
      <title>Simply Practice | Practice</title>

      <PageHeader title={languageText.common.header.practice[lang]} />
      <Suspense fallback={<LoadingWheel />} />
      <Waveform />
      <FunctionalCarousel />
      <div className="flex w-full justify-between items-center max-[600px]:justify-center">
        <FunctionalButtons />
        <SaveModal />
      </div>
    </MainContainer>
  );
}
