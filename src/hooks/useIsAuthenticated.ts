import { useEffect, useState } from 'react';

import { useLoginMutation, useRefreshMutation } from '../state/api/login';
import { useDispatch } from 'react-redux';
import { setApiVersion } from '@/state/slices/apiVersionSlice';

let isLogin = false;

const useIsAuthenticated = ({ site }: { site: string }) => {
  const isLocal = location.href.includes('localhost') || site === '';
  const [accessToken, setAccessToken] = useState(window.sessionStorage.getItem('token'));
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [refresh] = useRefreshMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    const currentSite = site ? site : sessionStorage.getItem('site');
    if (!currentSite && !isLocal) return;
    const postLogin = async (site: string) =>
      await login({ site, email: import.meta.env.VITE_AUTH_EMAIL, password: import.meta.env.VITE_AUTH_PASSWORD })
        .unwrap()
        .then((data) => data);
    const postRefresh = async () =>
      await refresh({})
        .unwrap()
        .then((data) => data);

    if (!accessToken && !isLogin) {
      isLogin = true;
      postLogin(currentSite as string).then((data) => {
        dispatch(setApiVersion({ version: 'v2' }));
        setAccessToken(data.access_token);
        window.sessionStorage.setItem('ver', 'v2');
        window.sessionStorage.setItem('token', data.access_token);
        window.sessionStorage.setItem('token_expires_in', (new Date().getTime() + data.expires_in * 1000).toString());
      });
    }
    if (accessToken && isRefresh) {
      postRefresh()
        .then((data) => {
          dispatch(setApiVersion({ version: 'v2' }));
          setIsRefresh(false);
          window.sessionStorage.setItem('ver', 'v2');
          window.sessionStorage.setItem('token', data.access_token);
          window.sessionStorage.setItem('token_expires_in', (new Date().getTime() + data.expires_in * 1000).toString());
        })
        .catch(() => {
          window.sessionStorage.removeItem('token');
          window.sessionStorage.removeItem('token_expires_in');
        });
    }

    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [site, dispatch, accessToken, isRefresh, login, refresh, isLocal]);

  useEffect(() => {
    window.setInterval(() => {
      if (window.sessionStorage.getItem('token_expires_in')) {
        const expiredTime = +window.sessionStorage.getItem('token_expires_in')!;
        // 10秒前refresh token
        if (expiredTime - new Date().getTime() <= 300000) {
          setIsRefresh(true);
        }
      }
    }, 1000);
  }, []);

  return { isAuthenticated, site };
};

export default useIsAuthenticated;
