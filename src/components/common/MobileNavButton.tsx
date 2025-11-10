import styled from "@emotion/styled";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  name: string;
};

const Styled = styled(Link)`
  foreground: var(--main-text);
  display: flex;
  justify-content: start;
  align-items: center;
  width: auto;
  height: 50px;
  padding: 10px;
`;

export default function MobileNavButton({ to, name }: Props) {
  return <Styled to={to}>{name}</Styled>;
}
