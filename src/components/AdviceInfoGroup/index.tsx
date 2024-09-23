import { AdviceContainer } from './style';
import AdviceInfo from '../AdviceInfo';
import { useSelector } from 'react-redux';
import { selectNewAdviceInfo } from '@/state/slices/adviceInfoSlice';
// import { useSelector } from 'react-redux';
// import { selectNewAdvicInfo } from '@/state/slices/adviceInfoSlice';

interface AdviceData {
  title: string;
  value: string;
}

interface Props {
  colSpan?: number;
  data: AdviceData[];
}

const AdviceInfoGroup = ({ data, colSpan = 1 }: Props) => {
  const newAdviceInfo = useSelector(selectNewAdviceInfo);
  const noInitialData = !data || Object.keys(data)?.length === 0;

  return (
    <AdviceContainer colSpan={colSpan}>
      {!noInitialData &&
        data.map((item, index) => <AdviceInfo sx={{ padding: 0 }} key={index} colSpan={colSpan} value={item.value} title={item.title} />)}
      {newAdviceInfo?.length > 0 &&
        newAdviceInfo.map((item, index) => <AdviceInfo sx={{ padding: 0 }} key={index} colSpan={colSpan} value={item.value} title={item.title} />)}
    </AdviceContainer>
  );
};
export default AdviceInfoGroup;
