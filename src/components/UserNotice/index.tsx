import { ContentData, ListDatum } from '@/model/dashboard.model';
import { ToggleButton } from '../ToggleContentGroup/style';
import { ReactComponent as ArrowSvg } from '@/assets/greyArrow.svg';
import { ReactComponent as AlertSvg } from '@/assets/alert-triangle-fill.svg';
import { Box } from '@mui/material';
import { Title } from '../Title';
import { selectNotice, setNotice } from '@/state/slices/componentStateSlice';
import { useDispatch, useSelector } from 'react-redux';
interface Content extends ContentData {
  list_data: ListDatum[];
}

interface Props {
  data: Content;
}

export const UserNotice = ({ data }: Props) => {
  const dispatch = useDispatch();
  const notice = useSelector(selectNotice);

  // if (!data.list_data || Object.values(data.list_data).length === 0) return <></>;

  return (
    <Box sx={{ padding: '12px 16px', backgroundColor: '#FAF1F2', borderRadius: '12px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertSvg />
          <Title sx={{ fontSize: '16px', margin: '0px', padding: '0px' }} hasFlag={false} name="特殊標籤" />
        </Box>
        <ToggleButton isOpen={notice} onClick={() => dispatch(setNotice(!notice))}>
          <ArrowSvg />
        </ToggleButton>
      </Box>
      {notice && data.list_data && Object.values(data.list_data).length && (
        <Box sx={{ paddingLeft: '34px', fontSize: '16px' }}>{data.list_data.map((notice) => notice.title).join('、')}</Box>
      )}
    </Box>
  );
};

export default UserNotice;
