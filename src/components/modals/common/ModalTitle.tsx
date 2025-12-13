import styled from "@emotion/styled";

type Props = {
  title: string;
};

const Styled = styled.h2`
  font-size: 20px;
  font-weight: 600;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

export default function ModalTitle({ title }: Props) {
  return <Styled>{title}</Styled>;
}
