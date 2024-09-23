import { styled } from '@mui/system';

export const MasonryListContainer = styled('div')({
  overflowY: 'auto',
  minWidth: '320px',
});

export const MasonryList = styled('div')({
  position: 'relative',
  margin: 'auto',
  overflow: 'hidden',
});

export const MasonryItem = styled('div')({
  padding: '10px',
  position: 'absolute',
  top: '0',
  left: '0',
  boxSizing: 'border-box',
});
