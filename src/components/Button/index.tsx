import { SxProps, Theme } from '@mui/material';
import { StyledButton } from './style';

interface Props {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}

export const Button = ({ sx, children, ...restProps }: Props) => {
  return (
    <StyledButton sx={() => ({ ...sx })} {...restProps}>
      {children}
    </StyledButton>
  );
};
