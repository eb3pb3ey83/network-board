import { Position } from '.';

let itemHeight: number[] = [];
const itemColSpans: number[] = [];

class MansoryStyle {
  private itemFullCount = 0;
  constructor(
    private column: number,
    private childrenRef: HTMLDivElement[],
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
      const currentLine = (itemIndex - this.itemFullCount) % this.column;
      console.log('this.itemFullCount :>> ', this.itemFullCount, itemIndex);
      // console.log('-- (itemIndex - this.itemFullCount)', itemIndex - this.itemFullCount, itemIndex);
      if (colSpan > 1) {
        this.itemFullCount += 1;
      }

      // console.log('currentLine :>> ', currentLine, itemIndex);
      const minHeightColumn = this.columnHeights.reduce(
        (min, current, index) => {
          if (colSpan === 1) {
            return { height: this.columnHeights[currentLine], index: currentLine };
          } else {
            return current > min.height ? { height: current, index } : min;
          }
        },
        { height: colSpan === 1 ? Infinity : 0, index: 0 },
      );

      const translateY = minHeightColumn.height;
      const translateX = colSpan > 1 ? 0 : minHeightColumn.index * 100;

      this.itemPositions.push({
        index: itemIndex,
        left: translateX,
        top: translateY,
        bottom: translateY + itemHeight,
      });

      for (let i = 0; i < colSpan; i++) {
        const index = colSpan === 1 ? minHeightColumn.index + i : i;
        this.columnHeights[index] = translateY + itemHeight;
      }
    };
  }

  private getNewItemStyles() {
    const newItemStyles = [];

    for (let i = 0; i < itemHeight.length; i++) {
      const itemPosition = this.itemPositions[i];

      newItemStyles.push(
        `
          @media screen and (min-width: 800px) {
            .masonry-item${i} {
              opacity: 1;
              transform: translate3d(${itemPosition.left}%, ${itemPosition.top}px, 0);
            }
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

export function createMansoryStyle(column: number, childrenRef: HTMLDivElement[]) {
  return new MansoryStyle(column, childrenRef);
}
