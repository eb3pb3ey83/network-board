import { styled } from '@mui/material';

export const Content = styled('div')({
  color: '#212B36',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 400,
});

export const ToggleButton = styled('button')((props: { isOpen: boolean }) => ({
  fontSize: '14px',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  background: 'none',
  padding: '5px 0 0 0',
  color: '#F56920',
  cursor: 'pointer',

  '& > svg': {
    transform: props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));
