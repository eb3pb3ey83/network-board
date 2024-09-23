import { useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useDispatch, useSelector } from 'react-redux';
import { selectRole, setDisplay, setName, setSO, setSubsid, setToken } from '../../state/slices/userInfoSlice';
import useIsUserLoggedIn from '@/hooks/useIsUserLoggedIn';
import { ApiErrorDialog } from '@/components/ApiErrorDialog';
import { useOfflineError } from '@/hooks/useOfflineError';
import { selectNoService } from '@/state/slices/noServiceSlice';
import { Box } from '@mui/material';
import { ReactComponent as InfoBigSvg } from '@/assets/info-big.svg';

interface Props {
  site: string;
}

const Root = ({ site }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const top = import.meta.env.VITE_DIALOG_TOP;
  const { isAuthenticated } = useIsAuthenticated({ site });
  const isUserLoggedIn = useIsUserLoggedIn({ isAuthenticated, site });

  const [searchParams] = useSearchParams();
  const so = searchParams.get('so');
  const subsid = searchParams.get('subsid');
  const token = searchParams.get('token');
  const name = searchParams.get('name');
  const display = searchParams.get('display');
  const role = useSelector(selectRole);
  const noService = useSelector(selectNoService);
  useOfflineError();
  useEffect(() => {
    if (so && subsid && token && name) {
      dispatch(setSO(+so));
      dispatch(setSubsid(+subsid));
      dispatch(setToken(token));
      dispatch(setName(name));
    }
    if (display) {
      dispatch(setDisplay(display));
    }
  }, [dispatch, name, so, subsid, token, display]);

  useEffect(() => {
    // navigate(`/mock`);
    if (!isAuthenticated) return;
    if (isUserLoggedIn) {
      navigate(`index/${role}`);
    }
  }, [isAuthenticated, isUserLoggedIn, navigate, role]);

  return (
    <>
      {noService.message ? (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center', marginTop: 0 }}>
            <InfoBigSvg />
            <Box sx={{ fontSize: { xs: '20px', sm: '24px' }, fontWeight: 700, color: '#212B36' }}>{noService.message}</Box>
          </Box>
        </Box>
      ) : (
        <>{isAuthenticated && isUserLoggedIn && <Outlet />}</>
      )}
      <ApiErrorDialog />
    </>
  );
};

export default Root;
