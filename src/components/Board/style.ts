import { styled } from '@mui/material';

export const Item = styled('div')((props: { padding?: string; opacity?: number }) => ({
  padding: props.padding ? props.padding : '0',
  borderRadius: '12px',
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.06), 4px 4px 8px 0px rgba(0, 0, 0, 0.04)',
  fontSize: 0,
  overflow: 'hidden',
  background: '#fff',
  transition: 'all 0.5s',
  opacity: props.opacity,
}));
