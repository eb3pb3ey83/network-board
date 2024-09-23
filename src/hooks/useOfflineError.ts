import { setApiError } from '@/state/slices/apiErrorSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useOfflineError = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.onoffline = () => {
      dispatch(
        setApiError({
          isError: true,
          message: '已離線',
          code: 'offline',
        }),
      );
    };
    window.ononline = () => {
      dispatch(
        setApiError({
          isError: false,
          message: '已上線',
          code: '',
        }),
      );
    };
  }, [dispatch]);
};
