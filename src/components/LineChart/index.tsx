import { useChartBackground } from '@/hooks/useChartBackground';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LineChart as LineChartComponent } from '@mui/x-charts/LineChart';

interface Props {
  dataset: { date: string[]; data: number[] };
}

export const LineChart = ({ dataset }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { svgRef } = useChartBackground(matches, { isBarChart: false });
  const { date, data } = dataset;

  return (
    <Box sx={{ overflow: 'auto' }}>
      <LineChartComponent
        sx={{
          '& .MuiAreaElement-series-kbro': {
            fill: "url('#myGradient')",
          },
          '& .MuiChartsAxis-line': {
            stroke: '#c3c3c3',
          },
          '& .MuiChartsAxis-tick': {
            display: 'none',
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: '#778795',
          },
        }}
        series={[
          {
            id: 'kbro',
            area: true,
            color: '#FBAD1D',
            curve: 'linear',
            data,
            valueFormatter: (value) => `${Math.round(value)}%`,
          },
        ]}
        xAxis={[{ scaleType: 'point', data: date }]}
        margin={{ left: 60, top: 10, right: 20 }}
        width={matches ? 882 : 704}
        height={300}
        ref={svgRef}
      >
        <defs>
          <linearGradient id="myGradient" x1="332.25" y1="-93" x2="332.25" y2="244" gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor="#FBAD1D" />
            <stop offset="1" stopColor="#FBAD1D" stopOpacity="0" />
          </linearGradient>
        </defs>
      </LineChartComponent>
    </Box>
  );
};
