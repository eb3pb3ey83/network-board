import { BillRecvClass, WorkSheetData } from '@/model/dashboard.model';
import { Title } from '../Title';
import { Accordion } from '../Accordion';
import { Info } from '../Info';
import { Content } from '../ToggleContentGroup/style';
import { accordionListStyle } from '../Accordion/style';
import { NoData } from '../NoData';
import { getMoreBtnMethod } from '../../../utils/getMoreBtnMethod';

interface Props {
  data: WorkSheetData[];
  more?: BillRecvClass | null;
}
export const WorkSheet = ({ data, more }: Props) => {
  return data.length ? (
    <>
      <Title onMoreBtnClick={more ? getMoreBtnMethod(more) : more} name="工單記錄" sx={{ marginBottom: '16px' }} />
      {data.map((item, index) => (
        <Accordion index={index} key={item.id} title={item.createtime}>
          {item.content.map((content) => (
            <Info key={content.id} sx={accordionListStyle} title={content.title}>
              <Content>{content.value}</Content>
            </Info>
          ))}
        </Accordion>
      ))}
    </>
  ) : (
    <>
      <Title name="工單記錄" sx={{ marginBottom: '16px' }} />
      <NoData />
    </>
  );
};
