import { BillElement } from '@/model/dashboard.model';
import { selectProfile } from '@/state/slices/profileSlice';
import { useSelector } from 'react-redux';

const useProfile: () => [BillElement[]] = () => {
  const profile = useSelector(selectProfile);
  return [profile];
};

export default useProfile;
