import { styled } from '@mui/system';

export const Package = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 700,
  color: '#212B36',
  position: 'relative',
  padding: '12px 14px 12px 14px',
  backgroundColor: '#F4F6F8',
  borderRadius: '10px',
}));

export const FaqWrapper = styled('div')(() => ({
  display: 'flex',
  height: '76px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '17px',
}));

export const FaqContainer = styled('div')(() => ({
  display: 'flex',
  width: '92px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
}));

export const FaqText = styled('div')(() => ({
  textDecoration: 'inherit',
  textDecorationColor: '#212B36',
  color: '#212B36',
  textAlign: 'right',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px',
}));

export const ToggleButton = styled('button')(() => ({
  display: 'inline-flex',
  padding: '12px 16px',
  fontSize: '14px',
  borderRadius: '0px 0px 12px 12px',
  border: '0px',
  backgroundColor: '#F4F6F8',
  color: '#F56920',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
  cursor: 'pointer',

  '& > svg': {
    transform: 'rotate(270deg)',
  },
}));
