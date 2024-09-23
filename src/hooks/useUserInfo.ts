import { selectDisplay, selectName, selectRole, selectSO, selectSubsid, selectToken } from '@/state/slices/userInfoSlice';
import { useSelector } from 'react-redux';

const useUserInfo: () => [number, number, string, string, string, string] = () => {
  const so = useSelector(selectSO);
  const subsid = useSelector(selectSubsid);
  const token = useSelector(selectToken);
  const name = useSelector(selectName);
  const role = useSelector(selectRole);
  const display = useSelector(selectDisplay);
  return [so, subsid, token, name, role, display];
};

export default useUserInfo;
