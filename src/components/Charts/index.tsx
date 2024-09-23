import { Box } from '@mui/material';
import { LineChart } from '@/components/LineChart';
import { BarChart } from '@/components/BarChart';
import { NoChartData } from '../NoChartData';
import { useSelector } from 'react-redux';
import { ContentData } from '@/model/dashboard.model';
import { selectChartType } from '@/state/slices/componentStateSlice';

interface Props {
  data: ContentData;
}

export const Charts = ({ data }: Props) => {
  const chartType = useSelector(selectChartType);
  const chartData: { [key: string]: any } = data;
  return (
    <>
      {chartType === 'hfc' &&
        (!!chartData[chartType]?.date?.length ? (
          <>
            <LineChart dataset={chartData[chartType]} />
            <Box sx={{ paddingBottom: '16px', color: '#637381', textAlign: 'center', fontSize: '14px' }}>單位％</Box>
          </>
        ) : (
          <NoChartData />
        ))}
      {chartType === 'traffic' &&
        (!!chartData[chartType]?.length ? (
          <>
            <BarChart dataset={chartData[chartType]} />
            <Box sx={{ paddingBottom: '16px', color: '#637381', display: 'flex', justifyContent: 'center', fontSize: '14px', gap: '20px' }}>
              <Box>單位 Mbps</Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Box sx={{ width: '10px', height: '10px', background: '#0795D1' }} />
                <Box>下行</Box>
              </Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Box sx={{ width: '10px', height: '10px', background: '#FFA41B' }} />
                <Box>上行</Box>
              </Box>
            </Box>
          </>
        ) : (
          <NoChartData />
        ))}
    </>
  );
};

export default Charts;
