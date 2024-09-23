import { Box } from '@mui/material';
import { Info } from '../Info';
import { InfoGroup } from '../InfoGroup';
import { NoData } from '../NoData';
import Title from '../Title';
import { ToggleContentGroup } from '../ToggleContentGroup';

interface RowInfoData {
  createtime: string;
  item: string;
  content: string;
}

interface Props {
  colSpan?: number;
  data: RowInfoData[];
}

const RowInfo = ({ data }: Props) => {
  if (!data || Object.keys(data).length === 0) return <NoData />;
  return (
    <Box sx={{ padding: '0 16px 16px 16px' }}>
      {data.map((value, index, array) => (
        <InfoGroup column={1} key={index}>
          <Info lastChildPadding={index !== array.length - 1} title={value.createtime}>
            <Title name={value.item} sx={{ margin: '5px 0', padding: 0 }} hasFlag={false} smallText />
            <ToggleContentGroup name={value.content} index={index}>
              {value.content}
            </ToggleContentGroup>
          </Info>
        </InfoGroup>
      ))}
    </Box>
  );
};

export default RowInfo;
