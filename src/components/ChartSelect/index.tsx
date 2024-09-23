import { Form, Formik } from 'formik';
import { SelectOption } from '@/shared/types/general';
import FormikSelect from '@/components/FormikSelect';
import { Box } from '@mui/material';
import Title from '../Title';
import { useDispatch, useSelector } from 'react-redux';
import { selectChartType, setChartType } from '@/state/slices/componentStateSlice';
import { ContentData } from '@/model/dashboard.model';

interface Props {
  data: ContentData;
}

export const ChartSelect = ({ data }: Props) => {
  const dispatch = useDispatch();
  const chartType = useSelector(selectChartType);
  const options = data.select
    ? Object.entries(data.select).map((s) => {
        return { label: s[1], value: s[0] };
      })
    : [];

  return (
    <Box sx={{ padding: '16px 16px 0px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
      <Title name={data.value ? data.value : ''} sx={{ marginBottom: '16px' }} />
      <Formik
        enableReinitialize
        initialValues={{
          chartType,
        }}
        onSubmit={() => {}}
      >
        {({ setFieldValue }) => (
          <Form autoComplete="off">
            <FormikSelect
              onBlur={() => null}
              name="chartType"
              options={options}
              onChange={(selectedOption: SelectOption) => {
                setFieldValue('chartType', selectedOption.value);
                dispatch(setChartType(selectedOption.value));
              }}
              menuPortal
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChartSelect;
