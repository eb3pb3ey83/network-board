import { Box, Button } from '@mui/material';
import { Dialog } from '../Dialog';
import { useSelector } from 'react-redux';
import { selectApiError } from '@/state/slices/apiErrorSlice';
import { ReactComponent as AlertSvg } from '@/assets/alert.svg';
import { selectLoadingDialogTop } from '@/state/slices/userInfoSlice';

export const ApiErrorDialog = () => {
  const { isError, code, message } = useSelector(selectApiError);
  const top = useSelector(selectLoadingDialogTop);

  return (
    <>
      <Dialog
        top={top ? top : import.meta.env.VITE_DIALOG_TOP}
        sx={{
          width: { xs: '300px', sm: '480px' },
          padding: 0,
        }}
        open={isError}
      >
        <Box sx={{ padding: '20px 20px 16px 20px' }}>
          <AlertSvg style={{ width: '32px', height: '32px' }} />
        </Box>
        <Box sx={{ padding: '0 20px 16px 20px' }}>
          <Box>{message}</Box>
          <Box>錯誤代碼：{code ? code : '無錯誤代碼'}</Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
          <Button
            sx={{
              width: '88px',
              height: '36px',
              border: '1px solid #F56920',
              color: '#F56920',
              fontWeight: 700,
              borderRadius: '8px',
            }}
            onClick={() => location.reload()}
          >
            重新整理
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
