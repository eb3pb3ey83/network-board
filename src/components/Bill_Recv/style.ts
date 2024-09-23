import { styled } from '@mui/system';

export const BillWrapper = styled('div')(() => ({
  display: 'flex',
  padding: '20px 0px',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const Divide = styled('div')(() => ({
  borderBottom: '1px dashed #E5E8EB',
}));

export const BillTitle = styled('div')(() => ({
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineWeight: '30px',
}));

export const BillContentContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
}));

export const BillContentTitle = styled('div')(() => ({
  color: '#778795',
  textAlign: 'right',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '22px',
}));

export const BillContentText = styled('div')(() => ({
  color: '#212B36',
  textAlign: 'right',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px',
}));

export const ToggleButton = styled('button')((props: { isOpen: boolean }) => ({
  display: 'inline-flex',
  padding: '12px 16px',
  justifyContent: 'center',
  borderRadius: '0px 0px 12px 12px',
  alignItems: 'center',
  fontWeight: 400,
  border: '0px',
  backgroundColor: '#F4F6F8',
  color: '#F56920',
  width: '100%',
  fontSize: '14px',
  fontFamily: 'Public Sans !important',

  '& > svg': {
    transform: props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));
