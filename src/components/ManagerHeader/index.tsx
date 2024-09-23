import { ReactComponent as InfoSvg } from '@/assets/info.svg';
import { Header, HeaderContainer, HeaderWrapper } from './style';
interface Props {
  name: string | string[];
  fullScreen?: boolean;
}
export const ManagerHeader = ({ name, fullScreen }: Props) => {
  return (
    <HeaderWrapper
      sx={{
        padding: { xs: '10px', sm: '10px 0', md: fullScreen ? '10px 36px' : '10px 0' },
        marginBottom: fullScreen ? 0 : '10px',
      }}
    >
      <HeaderContainer
        sx={{
          width: { xs: '100%', sm: fullScreen ? '100%' : '740px', md: fullScreen ? '100%' : '916px' },
        }}
      >
        <Header>
          <InfoSvg />
          {name}
        </Header>
      </HeaderContainer>
    </HeaderWrapper>
  );
};
