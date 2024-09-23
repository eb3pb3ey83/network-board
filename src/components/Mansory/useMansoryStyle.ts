import React from 'react';
import { Params, Position } from '.';
import { createMansoryStyle } from './MansoryStyle';
import { equals } from 'ramda';

const getTopPosition = (positions: Position[]) => {
  return positions.map((position) => position.top);
};

const getBottomPosition = (positions: Position[]) => {
  return positions.map((position) => position.bottom);
};

const shouldUpdateList = (oldPosition: Position[], newPosition: Position[], { resize }: { resize: boolean }) => {
  if (resize) {
    return (
      (newPosition.length !== 0 && !equals(getTopPosition(oldPosition), getTopPosition(newPosition))) ||
      !equals(getBottomPosition(oldPosition), getBottomPosition(newPosition))
    );
  } else {
    return newPosition.length !== 0 && !equals(getTopPosition(oldPosition), getTopPosition(newPosition));
  }
};

export function useMansoryStyle({ childrenRef, column, fullScreen }: Params) {
  const [itemWidth, setItemWidth] = React.useState<string | null | undefined>('');
  const [itemStyles, setItemStyles] = React.useState<string | null | undefined>('');
  const [itemPositions, setItemPositions] = React.useState<Position[]>([]);
  const [tallestColumnHeight, setTallestColumnHeight] = React.useState(0);
  const resetItemPositions = () => setItemPositions([]);
  const resetItemStyles = () => setItemStyles('');

  const updateStyle = React.useCallback(
    ({ resize }: { resize: boolean }) => {
      const mansoryModifier = createMansoryStyle(column, childrenRef, fullScreen);
      const newStyle = mansoryModifier.updateItemStyles();

      if (!shouldUpdateList(itemPositions, mansoryModifier.itemPositions, { resize })) return;

      setItemStyles(newStyle);
      setItemPositions(mansoryModifier.itemPositions);
      setTallestColumnHeight(Math.max(...mansoryModifier.columnHeights));
    },
    [column, childrenRef, itemPositions],
  );

  const newStyle = React.useMemo(
    () => ({
      height: tallestColumnHeight + 100,
    }),
    [tallestColumnHeight],
  );

  return { itemWidth, setItemWidth, itemStyles, resetItemStyles, newStyle, childrenRef, itemPositions, resetItemPositions, updateStyle };
}
