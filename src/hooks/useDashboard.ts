// import mockData from '@/mock-data-has-float.json';
import { useGetDataMutation } from '@/state/api/dashboard';
import useUserInfo from './useUserInfo';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectApiVersion } from '@/state/slices/apiVersionSlice';
import { selectData, setData } from '@/state/slices/frameDataSlice';
import { Data } from '@/model/dashboard.model';

const useDashboard = (role: string): Data => {
  const { version } = useSelector(selectApiVersion);
  const [so, subsid, token, , , display] = useUserInfo();
  const [getData] = useGetDataMutation();
  const result = useSelector(selectData);
  const dispatch = useDispatch();
  const setApiData = (data: Data) => dispatch(setData(data));
  const controller = useRef<AbortController | null>(null);
  const ignore = useRef(false);
  useEffect(() => {
    controller.current = new AbortController();
    ignore.current = false;
  }, [so, subsid, token]);

  useEffect(() => {
    const getLayoutData = async () => {
      if (!controller.current) return;
      try {
        const data = await getData({ role, so, subsid, token, display, signal: controller.current.signal }).unwrap();
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    if (ignore.current) return;

    getLayoutData().then((res) => {
      if (!ignore.current && res) {
        ignore.current = true;
        setApiData(res);
      }
    });

    return () => {
      controller.current?.abort();
    };
  }, [version, so, subsid, token]);

  return result;
};

export default useDashboard;
