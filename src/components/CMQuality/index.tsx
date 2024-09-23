import { ContentData } from '@/model/dashboard.model';
import { Button } from '../Button';
import {
  CMQualityBar,
  CMQualityBarWrapper,
  CMQualityInfoWrapper,
  CMQualityLight,
  CMQualityPercent,
  CMQualityPercentText,
  CMQualityStatus,
  CMQualityTitle,
  CMQualityWrapper,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingDialogOpen } from '@/state/slices/layoutSlice';
import { selectSignalInfo } from '@/state/slices/signalInfoSlice';
// import { selectSignalInfo } from '@/state/slices/signalInfoSlice';

interface Props {
  objectNo: string;
  data: ContentData;
}

const CMQuality = ({ objectNo, data }: Props) => {
  const colInfo = useSelector(selectSignalInfo);
  const watchedData = colInfo[objectNo];
  const style = watchedData.style;
  // const style = useSelector(selectSignalInfo);
  const dispatch = useDispatch();
  // TODO 查測按鈕
  const onSearch = () => {
    dispatch(setLoadingDialogOpen(true));
  };

  return (
    <CMQualityWrapper>
      <CMQualityLight percent={style?.percent} mainColor={style.internal_color} subColor={style.external_color}></CMQualityLight>
      <CMQualityInfoWrapper percent={style.percent}>
        <CMQualityTitle>
          {data.title}
          {style.measure_button && (
            <Button sx={{ marginLeft: '8px' }} onClick={onSearch}>
              查詢
            </Button>
          )}
        </CMQualityTitle>
        {style?.percent && (
          <>
            <CMQualityPercentText>
              {Number(watchedData?.value)}
              <CMQualityPercent>%</CMQualityPercent>
            </CMQualityPercentText>
            <CMQualityBarWrapper color={style.external_color}>
              <CMQualityBar color={style.internal_color} percent={style.percent}></CMQualityBar>
            </CMQualityBarWrapper>
          </>
        )}
        {watchedData.value && !style?.percent && <CMQualityStatus>{watchedData.value}</CMQualityStatus>}
      </CMQualityInfoWrapper>
    </CMQualityWrapper>
  );
};

export default CMQuality;
