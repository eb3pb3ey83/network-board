import { styled } from '@mui/material/styles';

export const InfoGroupWrapper = styled('div')((props: { column: number }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.column}, 1fr)`,
  columnGap: '16px',
  borderBottom: '1px dashed #E5E8EB',
  '&:last-child': {
    paddingBottom: 0,
    border: 'none',
  },
}));
