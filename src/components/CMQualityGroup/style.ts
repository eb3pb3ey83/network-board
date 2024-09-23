import { styled } from '@mui/system';

export const LinkText = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: '0px 0px 12px 12px',
  backgroundColor: '#F4F6F8',
  color: ' #F56920',
  textAlign: 'right',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px',

  '& > svg': {
    transform: 'rotate(270deg)',
  },
}));
