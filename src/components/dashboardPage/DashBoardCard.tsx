import styled from "@emotion/styled";
import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  desc: string;
};

const CardWrapper = styled.div`
  width: 100%;
  height: 364px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  background-color: #fff;
`;

const CardHeader = styled.h3`
  width: 100%;
  padding: 0 4px 8px 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: 600;
  display: flex;
  align-items: center;
`;
const CardBody = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardFooter = styled.p`
  width: 100%;
  padding: 8px 4px 0 4px;
  margin-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #616161;
  display: flex;
  align-items: center;
`;

export default function DashBoardCard({ children, title, desc }: Props) {
  return (
    <CardWrapper>
      <CardHeader>{title}</CardHeader>
      <CardBody>{children}</CardBody>
      <CardFooter>{desc}</CardFooter>
    </CardWrapper>
  );
}
