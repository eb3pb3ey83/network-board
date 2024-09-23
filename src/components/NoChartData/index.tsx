import { NoDataBox, NoDataText } from './style';
import { ReactComponent as NoDataSvg } from '@/assets/no-chart-data.svg';

export const NoChartData = () => {
  return (
    <NoDataBox>
      <NoDataSvg />
      <NoDataText>暫無數據</NoDataText>
    </NoDataBox>
  );
};
