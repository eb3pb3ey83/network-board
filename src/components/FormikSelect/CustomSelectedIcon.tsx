import { components } from 'react-select';
import { alpha, MenuItem } from '@mui/material';
import { GREY } from '@/shared/constants/colors';

const { Option } = components;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSelectedIcon = (props: any) => {
  const { isSelected, data, selectProps } = props;
  // return !isMulti && isSelected ? (
  //   <Option {...props}>
  //     {/* <Box
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="space-between"
  //       width="100%"
  //     >
  //       <span>{data.label}</span>
  //       <SelectTickIcon color="#000" />
  //     </Box> */}
  //   </Option>
  // ) : (
  //   <Option {...props}>
  //     <MenuItem sx={{ width: '100%' }}>{data.label}</MenuItem>
  //   </Option>
  // );

  if (selectProps.className.includes('multi-text')) {
    return (
      <Option {...props}>
        <MenuItem
          sx={{
            typography: 'body2',
            padding: '6px 8px',
            width: '100%',
            borderRadius: '6px',
          }}
          style={data.hidden ? { display: 'none' } : {}}
        >
          {/* <Checkbox
            checkedIcon={<BpCheckedIcon mode="secondary" />}
            icon={<BpIcon />}
            sx={{
              margin: '0 16px 0 0',
              padding: '10px',
            }}
            checked={isSelected}
          /> */}
          {data.label}
        </MenuItem>
      </Option>
    );
  }
  return (
    <Option {...props}>
      <MenuItem
        sx={{
          typography: 'body2',
          padding: '6px 16px',
          width: '100%',
          borderRadius: '6px',
          height: '34px',
          background: isSelected ? alpha(GREY, 0.16) : 'transparent',
          // background: isSelected ? alpha(PRIMARY, 0.08) : 'transparent',
        }}
        style={data.hidden ? { display: 'none' } : {}}
      >
        {data.label}
      </MenuItem>
    </Option>
  );
};

export default CustomSelectedIcon;
