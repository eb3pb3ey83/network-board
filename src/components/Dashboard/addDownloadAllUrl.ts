import { allPass, assoc, assocPath, filter, map, pathEq, pipe, prop, propEq } from 'ramda';
import { baseUrl } from '@/state/api/apiSlice';
import { Data, Frame } from '@/model/dashboard.model';
const exportAllFileBaseUrl = `${baseUrl}api/v4/101/471301/esso/export/all?object=`;
export const addDownloadAllUrl = (data: Data) => {
  if (!data) return { updatedData: undefined };
  // 判断 content_box 是否满足条件
  const isTitleWithDownloadButton = allPass([propEq('title', 'type'), pathEq(true, ['style', 'download_button'])]);

  // 获取 frame 中所有 file-info 的 object_no
  const getFileObjectNos = pipe(prop<any>('content_box'), filter(propEq('file-info', 'type')), map(prop('object_no')));

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

  // 更新后的 frames
  const updatedFrames = addDownloadAllUrl(data.layout_data.frames);
  // 将更新后的 frames 放回原数据中
  const updatedData = assocPath(['layout_data', 'frames'], updatedFrames, data);
  return { updatedData };
};
