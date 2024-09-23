import { useChartBackground } from '@/hooks/useChartBackground';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { BarChart as BarChartComponent } from '@mui/x-charts/BarChart';

interface Props {
  dataset: { [key: string]: string | number | Date }[];
}

export const BarChart = ({ dataset }: Props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { svgRef } = useChartBackground(matches, { isBarChart: true });

  return (
    <Box sx={{ overflow: 'auto' }}>
      <BarChartComponent
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
        dataset={dataset}
        series={[
          {
            dataKey: 'us',
            color: '#FFA41B',
            valueFormatter: (value) => `${value}Mbps`,
          },
          {
            dataKey: 'ds',
            color: '#0795D1',
            valueFormatter: (value) => `${value}Mbps`,
          },
        ]}
        width={matches ? 914 : 738}
        height={300}
        margin={{ top: 5 }}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'date',
            barGapRatio: 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        ]}
        ref={svgRef}
      />
    </Box>
  );
};
