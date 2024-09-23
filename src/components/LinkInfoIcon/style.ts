import styled from '@mui/material/styles/styled';
export const FaqWrapper = styled('div')(() => ({
  display: 'inline-flex',
  width: '33%',
  height: '76px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '17px',
  marginBottom: '16px',
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
