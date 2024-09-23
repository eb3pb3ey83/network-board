import { CMQuality } from '@/model/dashboard.model';
import { selectCMQuality } from '@/state/slices/cmQualitySlice';
import { useSelector } from 'react-redux';

const useCMQuality: () => [CMQuality[]] = () => {
  const cmQuality = useSelector(selectCMQuality);
  return [cmQuality];
};

export default useCMQuality;
