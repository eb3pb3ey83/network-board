import { styled } from '@mui/material';
import plusSvg from '@/assets/plus.svg';

export const accordionListStyle = {
  width: '100%',
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  padding: '8px 0',

  '&:last-child': {
    paddingBottom: '8px',
  },

  '& > div:first-of-type': {
    minWidth: '57px',
  },
};

export const AccordionHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  background: '#F4F6F8',
  padding: '10px 10px 10px 14px',
  fontWeight: 600,
  color: '#454F5B',
  fontSize: '14px',
});
export const AccordionWrapper = styled('div')({
  borderRadius: '12px',
  border: '1px solid #E5E8EB',
  overflow: 'hidden',

  '&:not(:last-child)': {
    marginBottom: '12px',
  },
});
export const AccordionDetails = styled('div')({
  padding: '10px 14px',
});
export const AccordionToggleButton = styled('button')({
  width: '28px',
  height: '28px',
  padding: '0',
  borderRadius: '4px',
  border: '1px solid #CAD0D7',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const AccordionIcon = styled('span')((props: { isOpen: boolean }) => ({
  border: 'none',
  background: props.isOpen ? '#637381' : `url(${plusSvg})`,
  width: props.isOpen ? '12px' : '20px',
  height: props.isOpen ? '2px' : '20px',
  display: 'block',
  transform: 'rotate(0)',
  padding: 0,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  opacity: props.isOpen ? 0.8 : 1,
}));
