import { styled } from "@mui/material";

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
  cursor: 'pointer',

  '& > svg': {
    transform: props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));