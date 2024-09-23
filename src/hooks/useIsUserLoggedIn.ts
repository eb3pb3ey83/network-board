import { useUserLoginMutation } from '@/state/api/userLogin';
import {
  setCMQualityTimeout,
  setCMQualityTimeoutWording,
  setDefaultTimeout,
  setDefaultTimeoutWording,
  setLoadingDialogTop,
  setMeasureDialogTop,
  setRole,
  setSearchWording,
  setToken,
} from '@/state/slices/userInfoSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUserInfo from './useUserInfo';
import { selectApiVersion } from '@/state/slices/apiVersionSlice';
let isUserLogin = false;
const useIsUserLoggedIn = ({ isAuthenticated, site }: { isAuthenticated: boolean; site: string }) => {
  const dispatch = useDispatch();
  const [so, subsid, token, name, role] = useUserInfo();
  const { version } = useSelector(selectApiVersion);
  const [login] = useUserLoginMutation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const currentSite = site ? site : sessionStorage.getItem('site');
    const postLogin = async () =>
      await login({ site: currentSite, so, subsid, token, name, ver: version })
        .unwrap()
        .then((data) => data);

    if (!isAuthenticated || isUserLogin) return;
    isUserLogin = true;
    postLogin().then((data) => {
      if (!data?.viewer) return;
      const viewRole = data.viewer.find((v: { title: string; value: string }) => v.title === 'role');
      const viewToken = data.viewer.find((v: { title: string; value: string }) => v.title === 'UserToken');
      const [, defaultTimeoutWording, searchWording, CMQualityTimeoutWording] = data.wording;
      const [defaultTimeout, CMQualityTimeout] = data.timeout;
      const [loadingDialogTop, measureDialogTop] = data.dialog_top;
      if (viewRole && viewToken) {
        setIsUserLoggedIn(true);
        dispatch(setRole(viewRole.value));
        dispatch(setToken(viewToken.value));
        dispatch(setSearchWording(searchWording.value));
        dispatch(setDefaultTimeoutWording(defaultTimeoutWording.value));
        dispatch(setCMQualityTimeoutWording(CMQualityTimeoutWording.value));
        dispatch(setDefaultTimeout(defaultTimeout.value));
        dispatch(setCMQualityTimeout(CMQualityTimeout.value));
        dispatch(setLoadingDialogTop(loadingDialogTop.value));
        dispatch(setMeasureDialogTop(measureDialogTop.value));
      } else {
        setIsUserLoggedIn(false);
      }
    });
  }, [site, version, dispatch, isAuthenticated, login, so, subsid, token, name, role]);

  return isUserLoggedIn;
};

export default useIsUserLoggedIn;
