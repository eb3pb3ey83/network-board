import { SxProps, Theme } from '@mui/material';
import { Item } from './style';
import { useEffect, useState } from 'react';

interface Props {
  padding?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Board = ({ children, padding, sx }: Props) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <Item sx={() => ({ ...sx })} opacity={isShow ? 1 : 0} padding={padding}>
      {children}
    </Item>
  );
};
