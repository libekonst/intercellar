import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

type Props = {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
};
export function AppScaffold({ header, body, footer }: Props) {
  return (
    <ScaffoldRoot>
      <ScaffoldHeader>{header}</ScaffoldHeader>
      <ScaffoldMain>{body}</ScaffoldMain>
      {footer ? <div>{footer}</div> : null}
    </ScaffoldRoot>
  );
}

const ScaffoldRoot = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ScaffoldHeader = styled.header`
  height: 3rem;
  width: 100%;
`;

const ScaffoldMain = styled.main`
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
`;
