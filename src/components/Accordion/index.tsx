import { ReactNode, useEffect } from 'react';
import { AccordionDetails, AccordionHeader, AccordionIcon, AccordionToggleButton, AccordionWrapper } from './style';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccordation, setAccordation, setIsPageInitialize } from '@/state/slices/componentStateSlice';

interface Props {
  title: string;
  children: ReactNode;
  index: number;
  shouldOpenInStart?: boolean;
}

export const Accordion = ({ children, title, index, shouldOpenInStart }: Props) => {
  const dispatch = useDispatch();
  const accordionOpenState = useSelector(selectAccordation);
  const isOpen = accordionOpenState[index];
  const open = () => dispatch(setAccordation({ isOpen: true, index }));
  const toggle = () => dispatch(setAccordation({ isOpen: !isOpen, index }));

  useEffect(() => {
    if (shouldOpenInStart) {
      open();
      dispatch(setIsPageInitialize(true));
    }
  }, [shouldOpenInStart]);

  return (
    <AccordionWrapper>
      <AccordionHeader>
        <Box sx={{ display: 'inline' }}>{title}</Box>
        <AccordionToggleButton onClick={toggle}>
          <AccordionIcon isOpen={isOpen}></AccordionIcon>
        </AccordionToggleButton>
      </AccordionHeader>
      <AccordionDetails sx={{ display: isOpen ? 'block' : 'none' }}>{children}</AccordionDetails>
    </AccordionWrapper>
  );
};
