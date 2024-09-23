import { styled } from '@mui/material';

export const ProfileWrapper = styled('div')(() => ({
  display: 'flex',
  padding: '12px 16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '6px',
  backgroundColor: '#F4F6F8',
  borderRadius: '10px',
}));

export const MemberWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

export const Name = styled('div')({
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '24px',
});

export const SerialNo = styled('div')({
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '18px',
  backgroundColor: 'rgba(116, 213, 253, 0.40)',
  padding: '1px 8px',
  borderRadius: '24px',
  color: '#035A80',
});

export const Address = styled('div')({
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '22px',
});
