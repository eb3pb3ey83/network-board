import { useMemo } from 'react';
import { components } from 'react-select';
import Box from '@mui/material/Box';
import { GREY } from '@/shared/constants/colors';
import { SelectOption } from '@/shared/types/general';

const { ValueContainer } = components;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomValueContainer = (props: any) => {
  const { selectProps, isDisabled } = props;
  const values = useMemo<SelectOption[]>(() => {
    return props.getValue();
  }, [props]);

  const content = useMemo(() => {
    return values.map((item) => item.label).join(', ');
  }, [values]);

  if (selectProps.className.includes('multi-text') && content) {
    return (
      <ValueContainer {...props}>
        <Box
          display="flex"
          sx={
            isDisabled && {
              color: GREY,
            }
          }
        >
          {content}
          {props.children[1]}
        </Box>
      </ValueContainer>
    );
  }
  return <ValueContainer {...props}>{props.children}</ValueContainer>;
};

export default CustomValueContainer;
