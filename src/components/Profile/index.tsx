import { BillElement } from '@/model/dashboard.model';
import { Address, MemberWrapper, Name, ProfileWrapper, SerialNo } from './style';
import { getInfo } from '../InfoGroup';
import useProfile from '@/hooks/useProfile';

interface Props {
  showProfile?: boolean;
  lastItemSingle?: boolean;
}

export const Profile = ({ lastItemSingle, showProfile }: Props) => {
  let name!: string | string[];
  let no!: string | string[];
  let address!: string | string[];
  const infos: BillElement[] = [];
  const [data] = useProfile();
  data.forEach((p) => {
    p.title === '姓名' && (name = p.value);
    p.title === '編號' && (no = p.value);
    p.title === '地址' && (address = p.value);
    !['姓名', '編號', '地址'].includes(p.title) && infos.push(p);
  });

  return (
    <>
      {showProfile && (
        <ProfileWrapper>
          <MemberWrapper>
            <Name>{name}</Name>
            <SerialNo>{no}</SerialNo>
          </MemberWrapper>
          <Address>{address}</Address>
        </ProfileWrapper>
      )}
      {getInfo(infos, { lastItemSingle: lastItemSingle === true || infos.length % 2 !== 0 ? true : false })}
    </>
  );
};
