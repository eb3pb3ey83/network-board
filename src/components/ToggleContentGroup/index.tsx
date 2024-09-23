import { useEffect, useRef, useState } from 'react';
import { Content, ToggleButton } from './style';
import { Box } from '@mui/material';
import { ReactComponent as ArrowSvg } from '@/assets/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectToggleContentGroup, setToggleContentGroup } from '@/state/slices/componentStateSlice';

interface Props {
  name: string;
  index: number;
  children: string;
}

// const maxLength = 20;

export const ToggleContentGroup = ({ children, index, name }: Props) => {
  const dispatch = useDispatch();
  const accordionOpenState = useSelector(selectToggleContentGroup(name));
  const isOpen = accordionOpenState ? accordionOpenState[index] : false;
  const parent = useRef<null | HTMLDivElement>(null);
  const content = useRef<null | HTMLDivElement>(null);
  const [showToggleButton, setShowToggleButton] = useState(false);

  useEffect(() => {
    if (!content.current || !parent.current) return;
    const wrapper = parent.current.parentNode as HTMLDivElement;
    const container = wrapper?.parentNode as HTMLDivElement;
    if (content.current.clientWidth > container.clientWidth) {
      setShowToggleButton(true);
      wrapper.style.overflow = 'hidden';
    }
  }, []);

  return (
    <Box ref={parent} sx={{ width: '100%' }}>
      {!showToggleButton && (
        <Content sx={{ whiteSpace: 'nowrap' }} ref={content}>
          {children}
        </Content>
      )}
      {showToggleButton && (
        <>
          <Content ref={content} sx={isOpen ? {} : { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {children}
          </Content>
          <ToggleButton isOpen={isOpen} onClick={() => dispatch(setToggleContentGroup({ name, isOpen: !isOpen, index }))}>
            <Box>{isOpen ? '顯示更少' : '顯示更多'} </Box>
            <ArrowSvg />
          </ToggleButton>
        </>
      )}
    </Box>
  );
};
