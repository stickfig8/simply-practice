import MainContainer from "@/components/layout/MainContainer";
import IntroduceSection from "@/components/mainPage/IntroduceSection";

export default function MainPage() {
  return (
    <MainContainer isMain={true}>
      <IntroduceSection />
    </MainContainer>
  );
}
