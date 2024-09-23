import { ReactNode } from 'react';
import { FlexContainerBox } from './style';

interface Props {
  children: ReactNode;
}

export const FlexContainer = ({ children }: Props) => {
  return <FlexContainerBox>{children}</FlexContainerBox>;
};
