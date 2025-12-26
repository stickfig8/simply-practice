import { useSideBarStore } from "@/stores/sideBarStore";
import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
  isMain?: boolean;
};

const Styled = styled.main<{ isOpen: boolean; isMain: boolean }>`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: ${({ isMain }) => (isMain ? "" : "20px 12px")};
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    padding-top: ${({ isMain }) => (isMain ? "" : "80px")};
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

const MainContainer = ({ children, isMain = false }: Props) => {
  const { isOpen } = useSideBarStore();

  return (
    <Styled isOpen={isOpen} isMain={isMain}>
      {children}
    </Styled>
  );
};

export default MainContainer;
