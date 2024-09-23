import { styled } from '@mui/material';

export const FileInfoContainer = styled('div')({
  display: 'inline-flex',
  width: '50%',

  '&:nth-of-type(even)': {
    padding: '0 6px 12px 16px',
  },

  '&:nth-of-type(odd)': {
    padding: '0 16px 12px 6px',
  },

  '&:nth-last-of-type(-n+2)': {
    paddingBottom: '16px',
  },
});
