import { useReducer, useEffect } from 'react';
import { cond, always, pipe, equals, T } from 'ramda';
import { background } from './style';

interface ColorAction {
  type: string;
}

// An interface for our state
interface ColorState {
  mainColor: string;
  subColor: string;
}

export type Status = '優良' | '普通' | '不佳' | '未更新' | '未連線';

export const getLabelByStatus = pipe(
  cond<[arg0: string], string>([
    [equals('1'), always('優良')],
    [equals('2'), always('普通')],
    [equals('3'), always('不佳')],
    [equals('4'), always('未更新')],
    [T, always('')],
  ]),
);

const getColorByStatus = pipe(
  cond<[arg0: string], string>([
    [equals('1'), always('green')],
    [equals('2'), always('orange')],
    [equals('3'), always('red')],
    [equals('4'), always('grey')],
  ]),
);
export const useColor = (status: string) => {
  const percentColorReducer = (_state: ColorState, action: ColorAction) => {
    switch (action.type) {
      case 'red':
        return background['red'];
      case 'green':
        return background['green'];
      case 'orange':
        return background['orange'];
      default:
        return background['grey'];
    }
  };
  const [currentColor, dispatch] = useReducer(percentColorReducer, background['grey']);
  useEffect(() => {
    const color = getColorByStatus(status);
    dispatch({ type: color });
  }, [status]);

  return { currentColor };
};
