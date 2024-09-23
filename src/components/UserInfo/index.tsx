import { Address, MemberWrapper, Name, ProfileContainer, ProfileWrapper, SerialNo } from './style';
interface Props {
  name: string;
  subsid: string;
  address: string;
}

const UserInfo = ({ name, subsid, address }: Props) => {
  return (
    <ProfileContainer>
      <ProfileWrapper>
        <MemberWrapper>
          <Name>{name}</Name>
          <SerialNo>{subsid}</SerialNo>
        </MemberWrapper>
        <Address>{address}</Address>
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default UserInfo;
