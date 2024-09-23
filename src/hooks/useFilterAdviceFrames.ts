import { useDispatch, useSelector } from 'react-redux';
import { allPass, assocPath, pathEq, pipe, propEq, prop, reduce } from 'ramda';
import { setFilteredFrames } from '@/state/slices/layoutSlice';
import { selectData, setFilterFrameData } from '@/state/slices/frameDataSlice';
import { useEffect } from 'react';
import { Data, Frame, FrameContentBox } from '@/model/dashboard.model';
type Removable = { removable: boolean; storeInRedux?: boolean };

const isAdviceInfoGroupRemovable = allPass([propEq('advice-info-group', 'type'), pathEq({}, ['data', 'list_data'])]);
const isSpecialTagRemovable = allPass([propEq('special-tag', 'type'), pathEq({}, ['data', 'list_data'])]);

const isFrameRemovable = pipe(
  prop<FrameContentBox[]>('content_box'),
  reduce(
    (acc: Removable, box: FrameContentBox) => {
      if (isAdviceInfoGroupRemovable(box)) {
        return { removable: true, storeInRedux: true };
      }
      if (isSpecialTagRemovable(box)) {
        return { removable: true, storeInRedux: false };
      }
      return acc;
    },
    { removable: false },
  ),
);

const useFilterAdviceFrames = () => {
  const dispatch = useDispatch();
  const initialData = useSelector(selectData);

  const filterFramesWithIndex = (frames: Frame[]) => {
    const removableFrames: { index: number; frame: Frame }[] = [];
    const filteredFrames: Frame[] = [];

    frames.forEach((frame: Frame, index: number) => {
      const { removable, storeInRedux } = isFrameRemovable(frame);
      if (removable && storeInRedux) {
        removableFrames.push({ index, frame });
      } else if (!removable) {
        filteredFrames.push(frame);
      }
    });

    return { filteredFrames, removableFrames };
  };

  const filterAdviceFrames = (data: Data) => {
    const { filteredFrames, removableFrames } = filterFramesWithIndex(data.layout_data.frames);
    dispatch(setFilteredFrames(removableFrames));
    const updatedData = assocPath(['layout_data', 'frames'], filteredFrames, data);
    dispatch(setFilterFrameData(updatedData));
  };

  useEffect(() => {
    if (!initialData) return;
    filterAdviceFrames(initialData);
  }, [initialData]);
};

export default useFilterAdviceFrames;
