import React, { useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useMansoryStyle } from './useMansoryStyle';
import { symmetricDifference } from 'ramda';
import { useMediaQuery, useTheme } from '@mui/material';

export interface Params {
  childrenRef: React.MutableRefObject<HTMLDivElement[]>;
  column: number;
}

export interface Position {
  left: number;
  top: number;
  bottom: number;
  index: number;
}

export interface Props {
  column: number;
  children: JSX.Element[] | null | undefined;
  childrenRef: HTMLDivElement[];
  firstItemFullWidth?: boolean;
  firstTwoItemsFullWidth?: boolean;
  setChildrenRef: React.Dispatch<React.SetStateAction<HTMLDivElement[]>>;
  fullScreen: boolean;
}

const isPc = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
export const useMansoryFilter = ({ children, childrenRef, column, setChildrenRef, fullScreen }: Props) => {
  const [isInitialize, setIsinitialize] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const observer = React.useRef<ResizeObserver>();
  const [scrollTop, setScrollTop] = React.useState(() => 0);
  const { itemWidth, setItemWidth, newStyle, itemStyles, itemPositions, updateStyle } = useMansoryStyle({
    childrenRef,
    column,
    fullScreen,
  });

  const [originalElements, setOriginalElements] = React.useState<JSX.Element[] | null | undefined>(() => children);
  const [elements, setElements] = React.useState<JSX.Element[] | null | undefined>(() => []);
  const [itemIndex, setItemIndex] = React.useState<number[]>(() => []);
  const currentPosition = window.innerHeight + scrollTop;

  const onScroll = (e: React.UIEvent<HTMLElement>) => setScrollTop(e.currentTarget.scrollTop);

  React.useEffect(() => {
    if (children?.length !== originalElements?.length) {
      setIsinitialize(false);
      setChildrenRef([]);
    }
  }, [children]);

  React.useEffect(() => {
    const isDesktop = matches && isPc;
    if (!isDesktop) {
      setElements(originalElements);
      return;
    }

    const newItemIndex = itemPositions
      .filter((item) => {
        return item.bottom >= scrollTop && item.top <= currentPosition;
      })
      .map((value) => value.index);

    const newItemsOnTheScreen = originalElements?.filter((_element, index) => {
      return newItemIndex.includes(index);
    });

    const shouldUpdate = () => {
      return symmetricDifference(itemIndex, newItemIndex).length !== 0;
    };

    if (!shouldUpdate()) return;
    setItemIndex(newItemIndex);
    setElements(newItemsOnTheScreen);
  }, [matches, originalElements, itemIndex, scrollTop, itemPositions, currentPosition, elements]);

  const setWidth = React.useCallback(() => {
    setItemWidth(
      `
        @media screen and (min-width: 800px) {
          .masonry-item-width {
            width: ${100 / column}%;
          }
        }
      `,
    );
  }, [setItemWidth, column]);

  React.useEffect(() => {
    if (!isInitialize) {
      setIsinitialize(true);
      setWidth();
      setOriginalElements(children);
      setElements(children);
      updateStyle({ resize: false });
    }
    observer.current = new ResizeObserver(() => {
      updateStyle({ resize: true });
    });

    childrenRef.forEach((ref) => {
      const child = ref?.firstChild as HTMLDivElement;
      if (ref && child?.clientHeight === 0) {
        ref.style.padding = '0';
      } else if (ref && child?.clientHeight !== 0) {
        ref.style.padding = '';
      }
      observer.current && observer.current.observe(ref);
    });
  }, [isInitialize, column, updateStyle, setWidth, childrenRef, originalElements]);

  return { itemWidth, elements, newStyle, itemStyles, onScroll };
};
