import { Notice } from '@/model/dashboard.model';
import { Box } from '@mui/material';
import { Dialog } from '../Dialog';
import { Button } from '../Button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoadingDialogTop } from '@/state/slices/userInfoSlice';

interface Props {
  noticeData: Notice[];
}

export const UserNoticeDialog = ({ noticeData }: Props) => {
  const top = useSelector(selectLoadingDialogTop);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    noticeData.length && setOpen(true);
  }, [noticeData]);

  return noticeData.length ? (
    <>
      <Dialog
        top={top}
        sx={{
          width: { xs: '300px', sm: '480px' },
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          padding: 0,
        }}
        open={open}
      >
        <Box sx={{ display: 'flex', padding: '20px', flexDirection: 'column', width: '100%' }}>
          <Box sx={{ padding: 0, color: '#212B36', fontSize: '18px', fontStyle: 'normal', fontWeight: '700', lineHeight: '28px' }}>
            {noticeData[0].title}
          </Box>
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
          {noticeData[0].value}
        </Box>
        <Box sx={{ display: 'flex', padding: '20px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button onClick={() => setOpen(false)} sx={{ padding: '6px 16px', borderRadius: '8px', backgroundColor: '#F56920', color: '#FFFFFF' }}>
            確認
          </Button>
        </Box>
      </Dialog>
    </>
  ) : null;
};
