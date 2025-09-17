import styled from "@emotion/styled";

type Props = {
  width?: string;
  height?: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const Styled = styled.button<Props>`
  width: ${({ width }) => width || "100px"};
  height: ${({ height }) => height || "40px"};
  background: #ffffff;
  foreground: #000000;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    filter: brightness(90%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: none;
`;

export default function CommonButton({
  width,
  height,
  onClick,
  children,
  disabled,
}: Props) {
  return (
    <Styled width={width} height={height} disabled={disabled} onClick={onClick}>
      {children}
    </Styled>
  );
}
