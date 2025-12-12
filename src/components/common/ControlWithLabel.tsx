import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
};

const Styled = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 8px;

  align-items: center;
`;

export default function ControlWithLabel({ children }: Props) {
  return <Styled className="">{children}</Styled>;
}
