import { useMeasureQuery } from '@/state/api/measure';
import { selectFilteredFrames, selectLoadingDialogOpen, setIsMeasureDataUpdated, setLoadingDialogOpen } from '@/state/slices/layoutSlice';
import { selectDisplay, selectMeasureDialogTop, selectSearchWording } from '@/state/slices/userInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import useUserInfo from './useUserInfo';
import { selectApiVersion } from '@/state/slices/apiVersionSlice';
import { useEffect, useRef } from 'react';

import { setCMQualityResult } from '@/state/slices/cmQualityResultSlice';
import { clone, concat, forEach, isEmpty, lensPath, lensProp, map, over } from 'ramda';
import { selectFilterFrameData, selectFinalData, setFinalData } from '@/state/slices/frameDataSlice';
import { setNewAdviceInfo } from '@/state/slices/adviceInfoSlice';
import { Data, Frame } from '@/model/dashboard.model';
import { FilteredFrames } from '@/shared/interface/stateModel';
import { setSignalInfo } from '@/state/slices/signalInfoSlice';
import { MeasureData } from '@/model/measureData.model';
import { dispatchColInfo } from '@/components/DynamicComponent/dispatchMapping';

const temp = [
  {
    index: 2,
    frame: {
      id: 11,
      expand: false,
      col_span: 1,
      open_num: 1,
      show_num: 6,
      header: {
        display: false,
      },
      content_box: [
        {
          data: {
            title: '',
            value: '-',
            status: 0,
          },
          type: 'none',
          style: {
            percent: false,
            progress_bar: false,
            external_color: '',
            internal_color: '',
            measure_button: false,
          },
          object_no: '',
          id: 1,
        },
      ],
      footer: {
        display: false,
        object_no: 'bh001',
        style: {},
        data: {
          title: '常用功能',
          type: 'link',
          target: '_blank',
          value: 'https://cniseng.kbro.com.tw/portal/cmts/cm_measure.php?ver=eng&CompanyNo=101&SubsID=471301',
        },
      },
    },
  },
];

const addResultData = (data: Data, measureData: MeasureData) => {
  return over(
    lensPath(['layout_data', 'frames']),
    map((frame: Frame) => {
      // 檢查 expand 是否為 true
      if (frame.expand === true) {
        // 在 content_box 的後面添加 measureData
        return over(lensProp('content_box'), (contentBox) => concat(contentBox, measureData.data), frame);
      }
      return frame;
    }),
    data,
  );
};

const insertFrames = (frames: FilteredFrames[], data: Data) => {
  forEach((frame: FilteredFrames) => {
    data.layout_data.frames.splice(frame.index, 0, frame.frame);
  }, frames);
};
const removeFrames = (frames: FilteredFrames[], data: Data) => {
  forEach((frame: FilteredFrames) => {
    data.layout_data.frames.splice(frame.index, 1);
  }, frames);
};
const useMeasureData = (role: string) => {
  const insertDataTimes = useRef(0);
  const display = useSelector(selectDisplay);
  const data = useSelector(selectFinalData);
  const filterAdviceData = useSelector(selectFilterFrameData);
  const dispatch = useDispatch();
  const isLoadingDialogOpen = useSelector(selectLoadingDialogOpen);
  const searchWording = useSelector(selectSearchWording);
  const top = useSelector(selectMeasureDialogTop);
  const filteredFrames = useSelector(selectFilteredFrames);
  const [so, subsid, token] = useUserInfo();
  const { version } = useSelector(selectApiVersion);

  const { data: measureData, isFetching } = useMeasureQuery(
    { so, subsid, token, role, display: !display ? 'v' : display, ver: version },
    { skip: !isLoadingDialogOpen, refetchOnMountOrArgChange: true },
  );
  const adviceList = measureData?.suggestion?.list_data;
  const hasAdviceList = Array.isArray(adviceList);

  useEffect(() => {
    if (isFetching || !measureData) return;

    dispatch(setIsMeasureDataUpdated(true));
    dispatch(setSignalInfo({ object_no: measureData.object_no, style: measureData.style, data: { value: measureData.value } }));

    for (const content of measureData.data) {
      dispatchColInfo({ content, dispatch });
    }

    if (hasAdviceList) {
      dispatch(setNewAdviceInfo(adviceList));
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
      const newData = clone(data);
      const newResultData = addResultData(newData, measureData);
      insertFrames(temp, newResultData);
      dispatch(setFinalData(newResultData));

      setTimeout(() => {
        const newcorrect = clone(newResultData);
        removeFrames(temp, newcorrect);
        dispatch(setFinalData(newcorrect));
      }, 0);

      insertDataTimes.current = 1;
    }
  }, [insertDataTimes, data, measureData, dispatch]);

  useEffect(() => {
    const hasFilteredFrames = !isEmpty(filteredFrames);

    if (hasAdviceList && insertDataTimes.current === 0 && hasFilteredFrames) {
      const newData = clone(data);
      insertFrames(filteredFrames, newData);
      insertDataTimes.current = 1;
      dispatch(setFinalData(newData));
    }
    if (!hasAdviceList && hasFilteredFrames) {
      dispatch(setFinalData(filterAdviceData));
      insertDataTimes.current = 0;
    }
  }, [data, insertDataTimes, measureData, filteredFrames]);

  return { measureData, isLoadingDialogOpen, searchWording, top };
};

export default useMeasureData;
