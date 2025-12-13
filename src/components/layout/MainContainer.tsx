import { useSideBarStore } from "@/stores/sideBarStore";
import styled from "@emotion/styled";

const Styled = styled.main<{ isOpen: boolean }>`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-in-out;

  padding-top: 24px;
  @media (min-width: 768px) {
    padding-top: 80px;
  }

  margin-left: 0;
  ${({ isOpen }) =>
    isOpen &&
    `
    @media (min-width: 768px) {
      margin-left: 120px;
    }
  `}
`;

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSideBarStore();

  return <Styled isOpen={isOpen}>{children}</Styled>;
};

export default MainContainer;
