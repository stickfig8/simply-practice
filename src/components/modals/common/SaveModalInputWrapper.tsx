import { Label } from "@/components/ui/label";
import styled from "@emotion/styled";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Styled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 700px) {
    flex-direction: row;
    gap: 16px;
  }
`;

export default function SaveModalInputWrapper({ title, children }: Props) {
  return (
    <Styled>
      <Label className="text-base flex-shrink-0">{title}</Label>
      {children}
    </Styled>
  );
}
