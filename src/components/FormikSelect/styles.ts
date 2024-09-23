import { GroupBase, StylesConfig } from 'react-select';
import { alpha, styled } from '@mui/system';
import { BLACK, DARKGREY, ERROR, GREY, WHITE } from '@/shared/constants/colors';
import { SelectOption } from '@/shared/types/general';

interface StyledSelectProps {
  width?: string | number;
  label?: string;
  disabled?: boolean;
}

const StyledSelect = styled('div')<StyledSelectProps>(({ width, label, disabled }) => ({
  width,
  maxWidth: '100%',
  // margin: '0 0 20px 0',
  display: label ? 'flex' : 'initial',
  '&:hover': {
    cursor: disabled ? 'not-allowed' : 'text',
  },
  '&>:nth-of-type(2)': {
    flex: label ? 1 : 'initial',
  },
}));

const SelectLabel = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error?: boolean }>(({ error }) => ({
  fontSize: '14px',
  color: BLACK,
  padding: '10px 16px',
  borderRadius: '4px 0 0 4px',
  backgroundColor: 'lightgray',
  // conditional styles
  ...(error && {
    backgroundColor: 'rgba(255, 62, 73, 0.1)',
  }),
}));

const customStyles: StylesConfig<SelectOption, boolean, GroupBase<SelectOption>> = {
  option: (_provided, state) => ({
    // backgroundColor: state.isSelected ? WHITE : 'inherit',
    color: state.isSelected ? BLACK : BLACK,
    display: 'flex',
    alignItems: 'center',
    margin: '0 8px',
    padding: '0',
    fontSize: 14,
    cursor: 'pointer',
    '&:hover, &:active': {
      backgroundColor: 'transparent',
    },
  }),
  menu: (_provided, state) => ({
    gap: '4px',
    zIndex: 1,
    position: 'absolute', // make scrollbar start at the top when scroll appears
    backgroundColor: WHITE,
    borderRadius: 4,
    padding: '0',
    width: '100%',
    bottom: state.menuPlacement === 'top' ? '40px' : 'auto',
    boxShadow: '-20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
    filter: 'drop-shadow(0px 0px 2px rgba(145, 158, 171, 0.24))',
  }),
  menuList: () => ({
    padding: '8px 0',
    maxHeight: 300,
    overflow: 'auto',
    '::-webkit-scrollbar': {
      width: 6,
      height: 0,
    },
    '::-webkit-scrollbar-track': {
      borderRadius: 4,
      backgroundColor: WHITE,
    },
    '::-webkit-scrollbar-thumb': {
      background: 'lightgray',
      borderRadius: 4,
    },
  }),
  control: (_provided, state) => ({
    // none of react-select's styles are passed to <Control />
    // backgroundColor: state.selectProps['aria-invalid']
    //   ? 'rgba(255, 62, 73, 0.1)'
    //   : WHITE,
    // height: state.selectProps.isMulti
    //   ? 'fit-content' : state.selectProps.className === 'size-lg'
    //     ? 56 : state.selectProps.className === 'size-md'
    //       ? 40 : state.selectProps.className === 'size-sm'
    //         ? 36 : 'fit-content',
    // minHeight: state.selectProps.isMulti ?
    //   state.selectProps.className === 'size-lg' ?
    //     56 : state.selectProps.className === 'size-md' ?
    //       40 : state.selectProps.className === 'size-sm' ?
    //         36 : 40 : 'fit-content',
    // ...provided,
    background: state.selectProps.isDisabled ? alpha(GREY, 0.24) : 'initial',
    padding: state.selectProps.className?.includes('size-medium') ? '14px 0px 14px 6px' : '5px 0px 5px 6px',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: state.selectProps['aria-label'] ? '0 8px 8px 0' : '8px',
    fontSize: 14,
    margin: 'auto',
    border: `1px solid ${state.selectProps['aria-invalid'] ? ERROR : alpha(GREY, 0.32)}`,
    // change styles below if you want effect on hover or focus
    '&:hover, &:focus-within': {
      borderColor: state.selectProps['aria-invalid'] ? ERROR : BLACK,
      cursor: state.selectProps.isDisabled ? 'not-allowed' : 'pointer',
    },
    transition: 'border-color 0.2s ease-in-out',
  }),
  dropdownIndicator: (_provided, state) => ({
    display: 'flex',
    width: '18px',
    color: state.selectProps.isDisabled ? GREY : DARKGREY,
    transition: 'all .2s ease',
    transform:
      state.selectProps.menuPlacement === 'top' && !state.selectProps.menuIsOpen
        ? 'rotate(180deg)'
        : state.selectProps.menuPlacement === 'top' && state.selectProps.menuIsOpen
        ? 'rotate(0deg)'
        : state.selectProps.menuIsOpen
        ? 'rotate(180deg)'
        : 'none',
  }),
  placeholder: () => ({
    gridArea: '1/1',
    color: GREY,
  }),
  indicatorsContainer: () => ({
    width: 30,
  }),
  input: () => ({
    gridArea: '1/1',
    color: BLACK,
    minWidth: '1px',
    flex: '1',
    // if you want to hide the caret
    caretColor: 'transparent',
  }),
  // valueContainer: (base, state) => ({
  //   ...base,
  //   ...(!state.selectProps.className?.includes('multi-text') && {
  //     gap: '4px',
  //     padding: '2px 8px 2px 6px',
  //   }),
  // }),
  multiValue: () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 8px',
    backgroundColor: alpha(GREY, 0.16),
    borderRadius: '50px',
    fontSize: '13px',
    lineHeight: '18px',
  }),
  // multiValueRemove: (base, state) => ({
  //   ...base,
  //   display: state.selectProps.isDisabled ? 'none' : 'flex',
  //   padding: '3px',
  //   width: '16px',
  //   height: '16px',
  //   backgroundColor: alpha(BLACK, 0.2),
  //   borderRadius: '50%',
  //   color: alpha(WHITE, 0.8),
  //   '&:hover': {
  //     backgroundColor: alpha(BLACK, 0.4),
  //     color: alpha(WHITE, 0.8),
  //   },
  // }),
  // menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

export { customStyles, SelectLabel, StyledSelect };
