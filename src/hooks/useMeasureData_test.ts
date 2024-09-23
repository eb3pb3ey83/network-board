import { useMeasureQuery } from '@/state/api/measure';
import { selectFilteredFrames, selectLoadingDialogOpen, setIsMeasureDataUpdated, setLoadingDialogOpen } from '@/state/slices/layoutSlice';
import { selectMeasureDialogTop, selectSearchWording } from '@/state/slices/userInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import useUserInfo from './useUserInfo';
import { selectApiVersion } from '@/state/slices/apiVersionSlice';
import { useEffect, useRef } from 'react';

import { setCMQualityResult } from '@/state/slices/cmQualityResultSlice';
import { clone, findLastIndex, forEach, insertAll, isEmpty, lensPath, lensProp, map, over, propEq } from 'ramda';
import { selectFinalData, setFinalData } from '@/state/slices/frameDataSlice';
import { setNewAdviceInfo } from '@/state/slices/adviceInfoSlice';
import { Data } from '@/model/dashboard.model';
import { FilteredFrames } from '@/shared/interface/stateModel';
import { dispatchColInfo } from '@/components/DynamicComponent/dispatchMapping';

const fakeData = [
  {
    title: '速率不吻合',
    value: '請先確認用戶是否促案升/降頻，若無促案請按立即開通。',
  },
];

const addResultData = (data: any, measureData: any) => {
  return over(
    lensPath(['layout_data', 'frames']),
    map((frame) => {
      return over(
        lensProp<any>('content_box'),
        (contentBox) => {
          // 找到最後一個 type 為 col-info 的索引
          const lastColInfoIndex = findLastIndex(propEq('col-info', 'type'), contentBox);

          // 合併數據到找到的 col-info 項目之後
          return lastColInfoIndex !== -1 ? insertAll(lastColInfoIndex + 1, measureData.data, contentBox) : contentBox;
        },
        frame,
      );
    }),
    data,
  );
};

const insertFrames = (frames: FilteredFrames[], data: Data) => {
  forEach<FilteredFrames>((frame) => {
    data.layout_data.frames.splice(frame.index, 0, frame.frame);
  }, frames);
};
const useMeasureData = (role: string) => {
  const insertDataTimes = useRef(0);
  const data = useSelector(selectFinalData);
  // const filterAdviceData = useSelector(selectFilterFrameData);
  const dispatch = useDispatch();
  const isLoadingDialogOpen = useSelector(selectLoadingDialogOpen);
  const searchWording = useSelector(selectSearchWording);
  const top = useSelector(selectMeasureDialogTop);
  const filteredFrames = useSelector(selectFilteredFrames);
  const [so, subsid, token] = useUserInfo();
  const { version } = useSelector(selectApiVersion);
  const { data: measureData, isFetching } = useMeasureQuery(
    { so, subsid, token, role, ver: version },
    { skip: !isLoadingDialogOpen, refetchOnMountOrArgChange: true },
  );
  // const adviceList = measureData?.suggestion?.list_data;
  // const hasAdviceList = Array.isArray(adviceList);

  useEffect(() => {
    if (isFetching || !measureData) return;

    dispatch(setIsMeasureDataUpdated(true));

    for (const content of measureData.data) {
      dispatchColInfo({ content, dispatch });
    }

    if (true) {
      dispatch(setNewAdviceInfo(fakeData));
    }

    const timeout = setTimeout(() => {
      dispatch(setLoadingDialogOpen(false));
      dispatch(setCMQualityResult(measureData.value));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data, isFetching, measureData]);

  useEffect(() => {
    if (role !== 'usr') return;
    if (measureData?.data && insertDataTimes.current === 0) {
      const newData = addResultData(clone(data), measureData);
      dispatch(setFinalData(newData));
      insertDataTimes.current = 1;
    }
  }, [insertDataTimes, data, measureData, dispatch]);

  useEffect(() => {
    const hasFilteredFrames = !isEmpty(filteredFrames);
    console.log('hasFilteredFrames :>> ', hasFilteredFrames);
    if (measureData && true && insertDataTimes.current === 0 && hasFilteredFrames) {
      // for (const frames of filteredFrames) {
      //   newData.layout_data.frames.splice(frames.index, 0, frames.frame);
      // }
      const newData = clone(data);
      insertFrames(filteredFrames, newData);
      console.log('newData :>> ', newData);
      insertDataTimes.current = 1;
      dispatch(setFinalData(newData));
    }
    // if (!hasAdviceList && hasFilteredFrames) {
    //   dispatch(setFinalData(filterAdviceData));
    //   insertDataTimes.current = 0;
    // }
  }, [insertDataTimes, measureData, filteredFrames]);

  return { measureData, isLoadingDialogOpen, searchWording, top };
};

export default useMeasureData;
