import { styled } from '@mui/system';

export const TitleDiv = styled('div')((props: { paddingTop?: boolean; smallText?: boolean; hasFlag: boolean }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: props.smallText ? '16px' : '18px',
  fontStyle: 'normal',
  fontWeight: 700,
  color: '#212B36',
  position: 'relative',
  marginTop: props.hasFlag ? '16px' : 0,
  padding: props.paddingTop ? '16px 16px 0 16px' : '0 16px',
  marginBottom: props.hasFlag ? '16px' : 0,

  '&:before': {
    content: '""',
    display: props.hasFlag ? 'block' : 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    borderRadius: '0px 2px 2px 0px',
    width: '4px',
    height: '20px',
    background: '#F56920',
  },
}));

export const Suffix = styled('div')(() => ({
  color: '#637381',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '22px',
}));
