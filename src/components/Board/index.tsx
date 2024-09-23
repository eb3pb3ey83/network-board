import { SxProps, Theme } from '@mui/material';
import { Item } from './style';

interface Props {
  padding?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Board = ({ children, padding, sx }: Props) => {
  return (
    <Item sx={() => ({ ...sx })} padding={padding}>
      {children}
    </Item>
  );
};
