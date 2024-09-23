import { ReactNode } from 'react';
import { InfoTitle, InfoWrapper } from './style';
import { SxProps, Theme } from '@mui/material';

interface Props {
  title: string;
  children: ReactNode;
  hasBorder?: boolean;
  sx?: SxProps<Theme>;
  lastChildPadding?: boolean;
}
export const Info = ({ sx, title, children, hasBorder, lastChildPadding }: Props) => {
  return (
    <InfoWrapper sx={() => ({ ...sx })} lastChildPadding={lastChildPadding} hasBorder={hasBorder}>
      <InfoTitle>{title}</InfoTitle>
      {children}
    </InfoWrapper>
  );
};
