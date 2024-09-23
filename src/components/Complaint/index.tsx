import { BillRecvClass, ComplaintData } from '@/model/dashboard.model';
import { Title } from '../Title';
import { InfoGroup } from '../InfoGroup';
import { Info } from '../Info';
import { ToggleContentGroup } from '../ToggleContentGroup';
import { NoData } from '../NoData';
import { getMoreBtnMethod } from '../../../utils/getMoreBtnMethod';

interface Props {
  name: string;
  title: string;
  data: ComplaintData[];
  suffix?: string;
  more?: BillRecvClass | null;
}

export const Complaint = ({ name, title, data, suffix, more }: Props) => {
  return data.length ? (
    <>
      <Title name={title} suffix={suffix} onMoreBtnClick={more ? getMoreBtnMethod(more) : more} sx={{ marginBottom: '16px' }} />
      {data.map((value, index, array) => (
        <InfoGroup column={1} key={value.id}>
          <Info lastChildPadding={index !== array.length - 1} title={value.createtime}>
            <Title name={value.item} sx={{ padding: '5px 16px' }} hasFlag={false} smallText />
            <ToggleContentGroup name={name} index={index}>
              {value.content}
            </ToggleContentGroup>
          </Info>
        </InfoGroup>
      ))}
    </>
  ) : (
    <>
      <Title name={title} suffix={suffix} onMoreBtnClick={more ? getMoreBtnMethod(more) : more} sx={{ marginBottom: '16px' }} />
      <NoData />
    </>
  );
};
