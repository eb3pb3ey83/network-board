import { Link } from 'react-router-dom';
import { FaqContainer, FaqText, FaqWrapper } from './style';
import { Box } from '@mui/material';
import { ReactComponent as FaqSvg } from '@/assets/faq.svg';
import { ReactComponent as RepairSvg } from '@/assets/repair.svg';
import { ReactComponent as VectorSvg } from '@/assets/vector.svg';
import { FrameContentBox, URLClass } from '@/shared/interface/layoutDataModel';
import { always, cond, equals, pipe, prop, T } from 'ramda';

const isFunc = pipe(prop('type'), equals('func'));
const isLinkInValid = pipe(prop('link'), equals(''));

export const getMoreBtnMethod = (more: URLClass) => {
  return cond([
    [isFunc, (more) => () => eval(String(more.value))],
    [isLinkInValid, always(null)],
    [T, (more) => () => window.open(more.value, more.target)],
  ])(more);
};

const defaultUrl = {
  type: 'link',
  target: '',
  value: '',
};

const LinkInfoIcon = ({ data, style }: FrameContentBox) => {
  const urlData = (data.url as URLClass) ?? defaultUrl;

  const content = (
    <FaqContainer>
      <Box
        sx={{
          width: '48px',
          height: '48px',
          backgroundColor: '#F0F4F9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
        }}
      >
        {style.icon === 'faq' ? <FaqSvg /> : style.icon === 'repair' ? <RepairSvg /> : <VectorSvg />}
      </Box>
      <FaqText>{data.title}</FaqText>
    </FaqContainer>
  );

  return urlData.type === 'link' ? (
    <FaqWrapper>
      <Link to={urlData.value} target={urlData.target} style={{ fontSize: '14px', textDecoration: 'inherit', color: 'inherit' }}>
        {content}
      </Link>
    </FaqWrapper>
  ) : (
    <FaqWrapper>
      <button
        style={{ fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer' }}
        onClick={() => {
          const action = getMoreBtnMethod(urlData);
          action && action();
        }}
      >
        {content}
      </button>
    </FaqWrapper>
  );
};

export default LinkInfoIcon;
