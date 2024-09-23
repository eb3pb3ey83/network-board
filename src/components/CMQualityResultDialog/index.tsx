import { Box } from '@mui/material';
import { Dialog } from '../Dialog';
import { Button } from '../Button';
import { selectCMQualityResult, setCMQualityResult } from '@/state/slices/cmQualityResultSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoadingDialogTop } from '@/state/slices/userInfoSlice';

export const CMQualityResultDialog = () => {
  const dispatch = useDispatch();
  const result = useSelector(selectCMQualityResult);
  const top = useSelector(selectLoadingDialogTop);

  return (
    <Dialog
      top={top}
      sx={{
        width: { xs: '300px', sm: '480px' },
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: 0,
      }}
      open={!!result}
    >
      <Box sx={{ display: 'flex', padding: '20px', flexDirection: 'column', width: '100%' }}>
        <Box sx={{ padding: 0, color: '#212B36', fontSize: '18px', fontStyle: 'normal', fontWeight: '700', lineHeight: '28px' }}>檢測完畢</Box>
      </Box>
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: '400px',
          padding: '0 20px',
          color: '#212B36',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '24px',
        }}
      >
        檢測結果：{result}
      </Box>
      <Box sx={{ display: 'flex', padding: '20px', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => dispatch(setCMQualityResult(''))}
          sx={{ padding: '6px 16px', borderRadius: '8px', backgroundColor: '#F56920', color: '#FFFFFF' }}
        >
          確認
        </Button>
      </Box>
    </Dialog>
  );
};
