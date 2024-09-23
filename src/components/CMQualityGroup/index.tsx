/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowSvg } from '@/assets/arrow.svg';
import { LinkText } from './style';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import useUserInfo from '@/hooks/useUserInfo';
import { useMeasureQuery } from '@/state/api/measure';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '@/state/slices/profileSlice';
import { setCMQuality } from '@/state/slices/cmQualitySlice';
import useCMQuality from '@/hooks/useCMQuality';
import { selectMeasureDialogTop, selectSearchWording } from '@/state/slices/userInfoSlice';
import { BillRecvClass } from '@/model/dashboard.model';
import { LoadingDialog } from '../LoadingDialog';
import { selectApiVersion } from '@/state/slices/apiVersionSlice';
import { setAdviceNewaq500m, setAdvicebb } from '@/state/slices/adviceSlice';
import { setCMQualityResult } from '@/state/slices/cmQualityResultSlice';
import { CMQualityResultDialog } from '../CMQualityResultDialog';

interface Props {
  showLabel?: boolean;
  allPercent?: boolean;
  more?: BillRecvClass;
}

export const CMQualityGroup = ({ showLabel, allPercent, more }: Props) => {
  const dispatch = useDispatch();
  const searchWording = useSelector(selectSearchWording);
  const [data] = useCMQuality();
  const [so, subsid, token, , role] = useUserInfo();
  const [open, setOpen] = useState(false);
  const { version } = useSelector(selectApiVersion);
  const top = useSelector(selectMeasureDialogTop);
  const { data: measureData, isFetching } = useMeasureQuery(
    { so, subsid, token, role, ver: version },
    { skip: !open, refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (isFetching || !measureData) return;

    if (measureData?.message) {
      setOpen(false);
      return;
    }
    const timeout = setTimeout(() => {
      setOpen(false);
      dispatch(setCMQualityResult(measureData.cm_quality[0].value));
    }, 1000);

    dispatch(setProfile(measureData.user_profile));
    dispatch(setCMQuality(measureData.cm_quality));
    measureData?.advice_bb?.length && dispatch(setAdvicebb({ data: measureData.advice_bb }));
    measureData?.advice_newaq_500m?.length && dispatch(setAdviceNewaq500m({ data: measureData.advice_newaq_500m }));
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, isFetching, measureData]);

  return (
    <>
      <LoadingDialog top={top} open={open} searchWording={searchWording} />
      <CMQualityResultDialog />
      {data.map((cm, index) => {
        const hasLabel = showLabel || (index === 0 && Number.isNaN(Number(cm.value))) || Number.isNaN(Number(cm.value));
        const props = {
          ket: index,
          title: cm.title,
          status: !cm.status ? '' : cm.status,
          ...(index === 0 && !allPercent && { onSearch: () => setOpen(true) }),
          ...(hasLabel && { label: cm.value ? cm.value : String(cm.value) }),
          ...(!hasLabel && { percent: cm.value! }),
        };
        console.log(props);
        // return <CMQuality key={index} {...props} />;
        return <></>;
      })}
      {more ? (
        <Link target={more.target} to={more.value} style={{ textDecoration: 'inherit', color: 'inherit' }}>
          <LinkText>
            <Box>常用功能</Box>
            <ArrowSvg />
          </LinkText>
        </Link>
      ) : null}
    </>
  );
};
