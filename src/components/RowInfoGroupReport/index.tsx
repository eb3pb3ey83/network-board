import { Accordion } from '../Accordion';
import { Info } from '../Info';
import { Content } from '../ToggleContentGroup/style';
import { accordionListStyle } from '../Accordion/style';
import { NoData } from '../NoData';
import { Box } from '@mui/material';

export interface ReportData {
  id: number;
  callrequest: string;
  workcause: string;
  caseclose: string;
  msremark: string;
  mscomment: string;
  createtime: string;
}
interface Props {
  data: ReportData[];
}
const RowInfoGroupReport = ({ data }: Props) => {
  return data.length ? (
    <Box sx={{ padding: '0 16px 16px 16px' }}>
      {data.map((item) => (
        <Accordion index={333} key={item.id} title={item.createtime}>
          <Info sx={accordionListStyle} title="原因">
            <Content>{item.workcause}</Content>
          </Info>
          <Info sx={accordionListStyle} title="進件說明">
            <Content>{item.mscomment}</Content>
          </Info>
          <Info sx={accordionListStyle} title="備註">
            <Content>{item.msremark}</Content>
          </Info>
          <Info sx={accordionListStyle} title="結案">
            <Content>{item.caseclose}</Content>
          </Info>
        </Accordion>
      ))}
    </Box>
  ) : (
    <NoData />
  );
};

export default RowInfoGroupReport;
