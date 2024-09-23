import { Accordion } from '../Accordion';
import { Info } from '../Info';
import { Content } from '../ToggleContentGroup/style';
import { accordionListStyle } from '../Accordion/style';
import { NoData } from '../NoData';
import { Box } from '@mui/material';

export interface ComplaintData {
  id: number;
  servicename: string;
  level_A: string;
  level_B: string;
  level_C: string;
  MEMO: string;
  createDate: string;
}
interface Props {
  data: ComplaintData[];
}
const RowInfoGroupComplaint = ({ data }: Props) => {
  return data.length ? (
    <Box sx={{ padding: '0 16px 16px 16px' }}>
      {data.map((item, index) => (
        <Accordion index={item.id} key={index} title={item.createDate}>
          <Info sx={accordionListStyle} title="服務別">
            <Content>{item.servicename}</Content>
          </Info>
          <Info sx={accordionListStyle} title="申告類別">
            <Content>{item.level_A}</Content>
          </Info>
          <Info sx={accordionListStyle} title="申告項目">
            <Content>{item.level_B}</Content>
          </Info>
          <Info sx={accordionListStyle} title="申告補充">
            <Content>{item.level_C}</Content>
          </Info>
          <Info sx={accordionListStyle} title="備註">
            <Content>{item.MEMO}</Content>
          </Info>
        </Accordion>
      ))}
    </Box>
  ) : (
    <NoData />
  );
};

export default RowInfoGroupComplaint;
