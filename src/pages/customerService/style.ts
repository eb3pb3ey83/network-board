import { styled } from '@mui/system';

export const TrafficContainer = styled('div')(() => ({
  display: 'flex',
  gap: '16px',
}));

export const AdviceWrapper = styled('div')(() => ({
  padding: '12px 16px',
  borderRadius: '8px',
  backgroundColor: '#FAF1F2',
  marginBottom: '12px',
}));

export const Divide = styled('div')(() => ({
  borderBottom: '1px dashed #E5E8EB',
  marginBottom: '16px',
}));

export const Advice = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const AdviceTitle = styled('div')(() => ({
  color: '#DD060E',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '24px',
  marginBottom: '6px',
}));
