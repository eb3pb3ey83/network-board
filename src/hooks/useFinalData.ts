import { allPass, assoc, assocPath, filter, map, pathEq, pipe, prop, propEq } from 'ramda';
import { baseUrl } from '@/state/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterFrameData, selectFinalData, setFinalData } from '@/state/slices/frameDataSlice';
import { useEffect } from 'react';
import { Data, Frame, FrameContentBox } from '@/model/dashboard.model';
const exportAllFileBaseUrl = `${baseUrl}api/v4/101/471301/esso/export/all?object=`;

const useFinalData = () => {
  const dispatch = useDispatch();
  const filterFramesData = useSelector(selectFilterFrameData);
  const finalData = useSelector(selectFinalData);

  const addDownloadAllUrl = (data: Data) => {
    if (!data) return { updatedData: undefined };
    // 判断 content_box 是否满足条件
    const isTitleWithDownloadButton = allPass([propEq('title', 'type'), pathEq(true, ['style', 'download_button'])]);

    // 获取 frame 中所有 file-info 的 object_no
    const getFileObjectNos = pipe(prop<FrameContentBox[]>('content_box'), filter(propEq('file-info', 'type')), map(prop('object_no')));

    // 为符合条件的 content_box 添加 download_all_url 属性
    const addDownloadAllUrl = (frames: Frame[]) => {
      return map((frame) => {
        const fileObjectNos = getFileObjectNos(frame);
        const exportAllFileUrl = exportAllFileBaseUrl + `${JSON.stringify(fileObjectNos)}`;
        const updatedContentBox = map((contentBox) => {
          if (isTitleWithDownloadButton(contentBox)) {
            return assoc('download_all_url', exportAllFileUrl, contentBox);
          }
          return contentBox;
        }, frame.content_box);
        return assoc('content_box', updatedContentBox, frame);
      }, frames);
    };
    const hasFloat = data.layout_data.has_float;
    let updatedFloatBox;

    if (hasFloat) {
      updatedFloatBox = addDownloadAllUrl(data.layout_data.float_box);
    }

    // 更新后的 frames
    const updatedFrames = addDownloadAllUrl(data.layout_data.frames);
    // 将更新后的 frames 放回原数据中
    let updatedData;

    if (hasFloat) {
      updatedData = assocPath(['layout_data', 'frames'], updatedFrames, data);
      updatedData = assocPath(['layout_data', 'float_box'], updatedFloatBox, updatedData);
    } else {
      updatedData = assocPath(['layout_data', 'frames'], updatedFrames, data);
    }

    dispatch(setFinalData(updatedData));
  };

  useEffect(() => {
    if (!filterFramesData) return;
    addDownloadAllUrl(filterFramesData);
  }, [filterFramesData]);

  return finalData;
};

export default useFinalData;
