import { Box } from '@mui/material';
import { Loader } from '../Loader';
import { Dialog } from '../Dialog';

interface Props {
  open: boolean;
  searchWording: string;
  top?: number | null;
}

export const LoadingDialog = ({ open, searchWording, top }: Props) => {
  return (
    <Dialog
      top={top}
      sx={{
        width: { xs: 'auto', sm: '480px' },
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
        <Loader />
        <Box sx={{ fontSize: '14px', color: '#454F5B' }}>{searchWording}</Box>
      </Box>
    </Dialog>
  );
};
