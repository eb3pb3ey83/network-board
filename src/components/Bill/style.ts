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

export const BillText = styled('div')(() => ({
  textAlign: 'right',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

export const ToggleButton = styled('button')((props: { isOpen: boolean }) => ({
  display: 'inline-flex',
  padding: '12px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0px 0px 12px 12px',
  fontWeight: 400,
  border: '0px',
  backgroundColor: '#F4F6F8',
  color: '#F56920',
  width: '100%',
  fontSize: '14px',
  cursor: 'pointer',

  '& > svg': {
    transform: props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));
