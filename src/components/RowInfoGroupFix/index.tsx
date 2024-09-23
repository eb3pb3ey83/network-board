import { Accordion } from '../Accordion';
import { Info } from '../Info';
import { Content } from '../ToggleContentGroup/style';
import { accordionListStyle } from '../Accordion/style';
import { NoData } from '../NoData';
import { Box } from '@mui/material';

export interface FixData {
  id: number;
  worksheet: string;
  workkind: string;
  worker1: string;
  bookdate: string;
  finishdate: string;
  createtime: string;
  backcause1: string;
  msremark: string;
}
interface Props {
  data: FixData[];
}
const RowInfoGroupFix = ({ data }: Props) => {
  return data.length ? (
    <Box sx={{ padding: '0 16px 16px 16px' }}>
      {data.map((item, index) => (
        <Accordion index={index} key={item.id} title={item.createtime}>
          <Info sx={accordionListStyle} title="派工類別">
            <Content>{item.workkind}</Content>
          </Info>
          <Info sx={accordionListStyle} title="完工日期">
            <Content>{item.finishdate}</Content>
          </Info>
          <Info sx={accordionListStyle} title="細項">
            <Content>{item.backcause1}</Content>
          </Info>
          <Info sx={accordionListStyle} title="補充">
            <Content>{item.msremark}</Content>
          </Info>
        </Accordion>
      ))}
    </Box>
  ) : (
    <NoData />
  );
};

export default RowInfoGroupFix;
