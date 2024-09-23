import React from 'react';

interface Props {
  index?: number;
  colSpan?: number;
  firstItemFullWidth?: boolean;
  firstTwoItemsFullWidth?: boolean;
  fullScreen?: boolean;
  children: React.ReactNode;
}

const MansoryItemRef = React.forwardRef(({ fullScreen, index, children, colSpan }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const className = colSpan ? `masonry-item-width masonry-item-span${colSpan}` : 'masonry-item-width';
  return (
    <div
      key={index}
      className={`mansory-item ${fullScreen && 'mansory-item-full'} ${className} masonry-item${index}`}
      ref={ref}
      data-colspan={colSpan}
    >
      <div className="item">{children}</div>
    </div>
  );
});

export const MansoryItem = React.memo(MansoryItemRef);
