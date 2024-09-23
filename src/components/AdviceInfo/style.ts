import { styled } from '@mui/system';

export const TrafficContainer = styled('div')(() => ({
  display: 'flex',
  gap: '16px',
}));

export const AdviceContainer = styled('div')(() => ({
  padding: '0 16px',
}));

export const AdviceWrapper = styled('div')<{ colSpan: number; background?: string }>(({ colSpan, background }) => ({
  padding: '12px 16px',
  borderRadius: '8px',
  backgroundColor: background ?? '#FAF1F2',
  marginBottom: colSpan > 1 ? '0' : '12px',
  height: '100%',
}));

export const Divide = styled('div')(() => ({
  borderBottom: '1px dashed #E5E8EB',
  marginBottom: '16px',
}));

export const Advice = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const AdviceTitle = styled('div')<{ fontColor?: string }>(({ fontColor }) => ({
  color: fontColor ?? '#DD060E',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '24px',
  marginBottom: '6px',
}));
