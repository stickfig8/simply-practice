import styled from "@emotion/styled";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  name: string;
  onClick?: () => void;
};

const Styled = styled(Link)`
  foreground: var(--main-text);
  display: flex;
  justify-content: start;
  align-items: center;
  width: auto;
  height: 36px;
  padding: 8px;
  font-weight: 600;
`;

export default function MobileNavButton({ to, name, onClick }: Props) {
  return (
    <Styled to={to} onClick={onClick}>
      {name}
    </Styled>
  );
}
