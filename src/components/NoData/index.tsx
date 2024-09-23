import { Box } from '@mui/material';
import { NoDataBox, NoDataText } from './style';

export const NoData = () => {
  return (
    <Box sx={{ padding: '0 16px 16px 16px' }}>
      <NoDataBox>
        <NoDataText>暫無資料</NoDataText>
      </NoDataBox>
    </Box>
  );
};
