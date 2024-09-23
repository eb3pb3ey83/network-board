import { SxProps, Theme } from '@mui/material';
import DialogComponent from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ReactNode } from 'react';
interface Props {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  sx?: SxProps<Theme>;
  top?: number | null;
}
export const Dialog = ({ open, onClose, children, sx, top }: Props) => {
  const rootMargin = top ? { margin: { xs: `${top}px 0 0 0`, sm: `${top}px 0 0 0` } } : { margin: { xs: '38px', sm: '32px' } };

  return (
    <DialogComponent
      sx={{
        '& .MuiDialog-container': {
          alignItems: top ? 'flex-start' : 'center',
        },

        '& .MuiPaper-root': {
          borderRadius: '16px',
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: '300px', sm: 'inherit' },
          ...rootMargin,
        },
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={() => ({ ...sx })}>{children}</DialogContent>
    </DialogComponent>
  );
};
