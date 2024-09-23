import { styled } from '@mui/system';

export const TrafficContainer = styled('div')(() => ({
  display: 'flex',
  gap: '16px',
}));

export const AdviceContainer = styled('div')<{ colSpan: number }>(({ colSpan }) => ({
  display: colSpan > 1 ? 'grid' : 'block',
  columnGap: '12px',
  rowGap: '12px',
  gridTemplateColumns: 'repeat(3, 1fr)',
  paddingBottom: colSpan > 1 ? '16px' : '0',
  paddingTop: 0,
  paddingLeft: '16px',
  paddingRight: '16px',
}));

export const Divide = styled('div')(() => ({
  borderBottom: '1px dashed #E5E8EB',
  marginBottom: '16px',
}));
