import { styled } from '@mui/material';

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
