import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Style } from './StyleWrapper';
import { useMansoryFilter } from './useMansoryFilter';
import { MasonryList, MasonryListContainer } from './style';
import { MansoryItem } from './MansoryItem';
import { update } from 'ramda';

export interface Props {
  column: number;
  children: React.ReactElement[];
  firstItemFullWidth?: boolean;
  firstTwoItemsFullWidth?: boolean;
  header?: ReactNode;
  fullScreen: boolean;
  hasFloat?: boolean;
}

export interface Params {
  childrenRef: HTMLDivElement[];
  column: number;
  firstItemFullWidth?: boolean;
  firstTwoItemsFullWidth?: boolean;
  fullScreen?: boolean;
}

export interface Position {
  left: number;
  top: number;
  bottom: number;
  index: number;
}

const getContainerPadding = (hasFloat: boolean, fullScreen: boolean) => {
  if (hasFloat && fullScreen) {
    return '18px 18px 0 0';
  } else if (!hasFloat && fullScreen) {
    return { xs: 0, sm: 0, md: '18px 18px 0 18px' };
  } else {
    return { xs: 0, sm: 0, md: '0' };
  }
};

const getSpanStyle = (column: number) =>
  Array.from(
    { length: column },
    (_, index) => `
    .masonry-item-span${index + 1} {
      background-color: #fffdfb;
      width: ${(100 / column) * (index + 1)}%
    }
  `,
  ).join('');

export const Masonry = ({ hasFloat, fullScreen, children, column, firstItemFullWidth, firstTwoItemsFullWidth, header }: Props) => {
  const [childrenRef, setChildrenRef] = useState<HTMLDivElement[]>([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const childrenRefLength = useRef(0);
  const currentRef = useRef<HTMLDivElement[]>([]);
  const validChildren = useMemo(() => children.filter((child) => !!child), [children]);
  const columnSpanStyle = useMemo(
    () =>
      fullScreen
        ? getSpanStyle(column)
        : `
          @media screen and (min-width: 800px) {
          ${getSpanStyle(column)}
          }
        `,
    [column],
  );

  useEffect(() => {
    window.onresize = () => {
      setWindowHeight(window.innerHeight);
    };
  }, []);

  useEffect(() => {
    childrenRefLength.current = childrenRef.length;
    currentRef.current = childrenRef;
  }, [childrenRef, validChildren.length]);

  const updateChildren = (ref: HTMLDivElement) => {
    const newItemIndex = currentRef.current.findIndex((item) => {
      return item.className === ref.className;
    });
    const newChildrenRef = update(newItemIndex, ref, currentRef.current);
    currentRef.current = newChildrenRef;
    setChildrenRef(newChildrenRef);
  };

  const createChildren = (ref: HTMLDivElement) => {
    setChildrenRef((old) => [...old, ref]);
  };

  const setRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (ref === null) return;
      if (childrenRefLength.current === validChildren.length) {
        updateChildren(ref);
      } else {
        createChildren(ref);
      }
    },
    [validChildren.length],
  );

  const childrens = React.Children.map(validChildren, (child, index) => {
    return (
      <MansoryItem
        key={index}
        fullScreen={fullScreen}
        firstItemFullWidth={firstItemFullWidth}
        firstTwoItemsFullWidth={firstTwoItemsFullWidth}
        index={index}
        ref={setRef}
        colSpan={child?.props['data-colspan'] ?? 1}
      >
        {child}
      </MansoryItem>
    );
  });

  const { itemWidth, elements, newStyle, itemStyles, onScroll } = useMansoryFilter({
    children: childrens,
    childrenRef,
    column,
    firstItemFullWidth,
    firstTwoItemsFullWidth,
    setChildrenRef,
    fullScreen,
  });

  const containerStyle = useMemo(
    () => ({
      height: { xs: fullScreen ? windowHeight : 'auto', sm: windowHeight },
      padding: getContainerPadding(Boolean(hasFloat), fullScreen),
    }),
    [windowHeight, hasFloat, fullScreen],
  );

  return (
    <MasonryListContainer onScroll={onScroll} className="masonry-list-container" sx={containerStyle}>
      {header}
      <MasonryList
        sx={{
          width: { xs: '100%', sm: fullScreen ? '100%' : '760px', md: fullScreen ? '100%' : '936px' },
          height: { xs: fullScreen ? newStyle.height : 'auto', sm: newStyle.height },
        }}
      >
        <Style>{itemWidth}</Style>
        <Style>{itemStyles}</Style>
        <Style>{columnSpanStyle}</Style>
        {fullScreen && (
          <Style>
            {`
            body {
              overflow-y: hidden;
              overflow-x: auto;
            }
          `}
          </Style>
        )}
        {elements}
      </MasonryList>
    </MasonryListContainer>
  );
};
