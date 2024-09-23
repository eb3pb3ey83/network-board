import { styled } from '@mui/material';

export const BlockContainer = styled('div')(() => ({
  padding: '0 16px 16px 16px',
}));
export const linkStyle = {
  padding: '4px 16px',
  borderRadius: '36px',
  background: 'rgba(255, 164, 27, 0.20)',
  color: '#F56920',
  fontSize: '13px',
  fontWeight: 400,
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'inherit',
};
export const Block = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#F4F6F8',
  padding: '12px 14px',
  borderRadius: '10px',
}));

export const BlockTitle = styled('div')(() => ({
  color: '#212B36',
  fontSize: '16px',
  fontWeight: 600,
}));
