import { useId } from 'react';
import ReactSelect, { ActionMeta } from 'react-select';
import { FormControl, FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import { useField } from 'formik';
import { BLACK, DARKGREY, ERROR } from '@/shared/constants/colors';
import { SelectOption, SizeBreakPoint } from '@/shared/types/general';

import CustomSelectedIcon from './CustomSelectedIcon';
import CustomValueContainer from './CustomValueContainer';
import { customStyles, SelectLabel, StyledSelect } from './styles';
interface FormikSelectProps {
  title?: string;
  label?: string;
  isRequired?: boolean;
  size?: Exclude<SizeBreakPoint, 'large'>;
  placeholder?: string;
  style?: Record<string, string>;
  isMulti?: boolean;
  isMultiText?: boolean;
  width?: number | string;
  margin?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  optionValue?: string | number | any[];
  defaultValue?: SelectOption | SelectOption[];
  onChange: ((option: SelectOption, action: ActionMeta<SelectOption>) => void) | ((option: SelectOption[], action: ActionMeta<SelectOption>) => void);
  options: SelectOption[];
  errorText?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur: any;
  disabled?: boolean;
  menuPlacement?: 'bottom' | 'top';
  menuPortal?: boolean;
}

const FormikSelect: React.FC<FormikSelectProps> = ({
  title,
  label,
  isRequired,
  size = 'small',
  placeholder,
  style,
  isMulti,
  isMultiText,
  width,
  margin,
  onChange,
  options,
  errorText,
  name,
  onBlur,
  disabled,
  menuPlacement = 'bottom',
  menuPortal = false,
}) => {
  const uniqueId = useId();
  const [field, meta] = useField(name);
  const error = !!meta.error && !!meta.touched;
  const onSelectBlur = () => onBlur(name);
  const getValue = (options: SelectOption[]) => {
    if (isMulti) {
      if (Array.isArray(field.value)) {
        return options.filter((option: SelectOption) => field.value.includes(option.value));
      }
      return undefined;
    }

    return options ? options.find((option: SelectOption) => option.value === field.value) || null : undefined;
  };

  return (
    <FormControl
      sx={{
        width: width ? width : '160px',
        margin: margin ? margin : '0',
        transform: 'translate(5px, -6px)',
        ...style,
      }}
    >
      <Box display="flex" justifyContent="center" flexDirection="column">
        {title && (
          <Box typography="body2" display="flex" color={DARKGREY} mb="4px" alignItems="center">
            {isRequired && <span style={{ color: ERROR, marginRight: '2px' }}>*</span>}
            {title}
          </Box>
        )}
        <StyledSelect width={width} label={label} disabled={disabled}>
          {label && <SelectLabel>{label}</SelectLabel>}
          <ReactSelect
            isMulti={isMulti}
            className={`size-${size} ${isMultiText ? 'multi-text' : ''}`}
            instanceId={`react-select-${uniqueId}`} // this is to resolve "Warning: Prop 'id' did not match" error
            onBlur={onSelectBlur()}
            value={getValue(options)}
            // defaultValue={options.find((item) => item.value === field.value)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(value: any, action) => onChange(value, action)}
            placeholder={placeholder}
            isDisabled={disabled}
            styles={customStyles}
            options={options}
            {...(menuPortal && {
              menuPlacement: 'auto',
              menuPosition: 'fixed',
              menuPortalTarget: document?.body,
            })}
            maxMenuHeight={300}
            menuPlacement={menuPlacement}
            aria-label={label}
            aria-invalid={error}
            // closeMenuOnSelect={!isMulti}
            openMenuOnFocus
            openMenuOnClick
            components={{
              IndicatorSeparator: () => null,
              Option: CustomSelectedIcon,
              ValueContainer: CustomValueContainer,
            }}
            hideSelectedOptions={false}
            isClearable={false}
            isSearchable={false}
          />
        </StyledSelect>
      </Box>
      {(error || errorText) && (
        <FormHelperText
          sx={{
            typography: 'caption',
            color: error ? ERROR : BLACK,
            margin: '4px 0 0 15px',
          }}
        >
          {error ? meta.error : errorText ? errorText : ''}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikSelect;
