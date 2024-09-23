import { Position } from '.';

let itemHeight: number[] = [];
const itemColSpans: number[] = [];

class MansoryStyle {
  private currentPosition = 0;
  constructor(
    private column: number,
    private childrenRef: HTMLDivElement[],
    private fullScreen?: boolean,
  ) {
    this.columnHeights = new Array(this.column).fill(0);
  }

  // 每個物件的高度列表
  private getItemHeightAndColSpans() {
    if (!this.childrenRef) return [];
    return this.childrenRef
      .filter((childNode) => childNode !== null)
      .map((childNode, index) => {
        const height = childNode.clientHeight;
        const colSpan = parseInt(childNode.dataset.colspan || '1', 10); // 从 data-colspan 属性获取跨栏数
        itemColSpans[index] = colSpan;
        return height === 0 && itemHeight[index] ? itemHeight[index] : childNode.clientHeight;
      });
  }

  public columnHeights;

  public itemPositions: Position[] = [];

  private updateItemPositions() {
    const heights = this.getItemHeightAndColSpans();
    itemHeight = heights;
    heights.forEach(this.calculateItemsHeight());
  }

  private calculateItemsHeight() {
    return (itemHeight: number, itemIndex: number) => {
      const colSpan = itemColSpans[itemIndex] || 1;
      const isFull = this.currentPosition + colSpan === this.column;

      const minHeightColumn = this.columnHeights.reduce(
        (min, current, index) => {
          if (colSpan === this.column) {
            return current > min.height ? { height: current, index } : min;
          } else {
            return { height: this.columnHeights[this.currentPosition], index: this.currentPosition };
          }
        },
        { height: 0, index: 0 },
      );

      const translateY = minHeightColumn.height;
      const translateX = this.currentPosition * 100;

      this.itemPositions.push({
        index: itemIndex,
        left: translateX,
        top: translateY,
        bottom: translateY + itemHeight,
      });

      for (let i = this.currentPosition; i < this.currentPosition + colSpan; i++) {
        this.columnHeights[i] = translateY + itemHeight;
      }

      this.currentPosition = isFull ? 0 : this.currentPosition + colSpan;
    };
  }

  // private calculateItemsHeight() {
  //   return (itemHeight: number, itemIndex: number) => {
  //     const colSpan = itemColSpans[itemIndex] || 1;
  //     const minHeightColumn = this.columnHeights.reduce(
  //       (min, current, index) => {
  //         if (colSpan === 1) {
  //           return current < min.height ? { height: current, index } : min;
  //         } else {
  //           return current > min.height ? { height: current, index } : min;
  //         }
  //       },
  //       { height: colSpan === 1 ? Infinity : 0, index: 0 },
  //     );

  //     const translateY = minHeightColumn.height;
  //     const translateX = colSpan > 1 ? 0 : minHeightColumn.index * 100;

  //     this.itemPositions.push({
  //       index: itemIndex,
  //       left: translateX,
  //       top: translateY,
  //       bottom: translateY + itemHeight,
  //     });

  //     for (let i = 0; i < colSpan; i++) {
  //       const index = colSpan === 1 ? minHeightColumn.index + i : i;
  //       this.columnHeights[index] = translateY + itemHeight;
  //     }
  //   };
  // }

  private getNewItemStyles() {
    const newItemStyles = [];

    for (let i = 0; i < itemHeight.length; i++) {
      const itemPosition = this.itemPositions[i];
      const newStyle = `
        .masonry-item${i} {
          opacity: 1;
          transform: translate3d(${itemPosition.left}%, ${itemPosition.top}px, 0);
        }
      `;

      newItemStyles.push(
        this.fullScreen
          ? newStyle
          : `
          @media screen and (min-width: 800px) {
            ${newStyle}
          }
        `,
      );
    }

    return newItemStyles;
  }

  public updateItemStyles() {
    this.updateItemPositions();

    return this.getNewItemStyles()?.join('');
  }
}

export function createMansoryStyle(column: number, childrenRef: HTMLDivElement[], fullScreen?: boolean) {
  return new MansoryStyle(column, childrenRef, fullScreen);
}
