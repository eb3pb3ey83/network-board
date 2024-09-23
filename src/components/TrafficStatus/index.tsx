import { BillElement } from '@/model/dashboard.model';
import { Title } from '@/components/Title';
import { FlexContainerBox } from '@/components/FlexContainer/style';
import { Info } from '@/components/Info';
import { Content } from '@/components/ToggleContentGroup/style';
import { Box } from '@mui/material';
interface Props {
  data: BillElement[];
}

export const TrafficStatus = ({ data }: Props) => {
  return (
    <>
      <Title
        suffix={<Box sx={{ display: 'inline', color: '#637381', fontSize: '14px', paddingLeft: '10px', fontWeight: 400 }}>(近一週)</Box>}
        sx={{ marginLeft: 0, paddingTop: '16px' }}
        name="用戶流量"
        hasFlag={false}
      ></Title>

      <FlexContainerBox sx={{ padding: '0 16px' }}>
        {data.map((item) =>
          item.value ? (
            <Info key={item.id} sx={{ width: '50%' }} title={item.title}>
              <Content sx={{ color: item.status !== null ? '#DD060E' : '#212B36' }}>超標{item.value}次</Content>
            </Info>
          ) : (
            <Info key={item.id} sx={{ width: '50%' }} title={item.title}>
              <Content>-</Content>
            </Info>
          ),
        )}
      </FlexContainerBox>
    </>
  );
};
