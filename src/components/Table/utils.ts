import { anyPass, equals, ifElse, invoker, isNil, pipe, prop, subtract, tap, when } from 'ramda';

class TableUtils {
  private tableCellMaxHeight = 88;
  private calculateTooltipPosition = pipe(
    (icon: HTMLDivElement, tooltip: HTMLDivElement) => ({ rect: icon.getBoundingClientRect(), tooltip }),
    ({ rect, tooltip }) => ({
      top: subtract(rect.top, tooltip.offsetHeight),
      left: rect.left,
      width: rect.width,
      tooltip,
    }),
    ({ top, left, tooltip, width }) => {
      tooltip.style.top = `${top + tooltip.offsetHeight / 2}px`;
      tooltip.style.left = `${left - tooltip.offsetWidth + width}px`;
    },
  );

  private getTextHeight(element: HTMLDivElement, text: string) {
    const clone = element.cloneNode(true) as HTMLDivElement;
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.lineHeight = '20px';
    clone.style.width = String(element.offsetWidth) + 'px';
    clone.style.padding = '14px 16px';
    clone.style.fontSize = '14px';
    clone.style.wordBreak = 'break-all';
    clone.textContent = text;
    document.body.appendChild(clone);
    const height = clone.offsetHeight;
    document.body.removeChild(clone);
    return height;
  }

  private selectInfoBox(btnClassName: string) {
    return document.querySelector(`.info-box.${btnClassName}`) as HTMLDivElement;
  }

  private createIconAndInfoBox(cellElement: HTMLDivElement, originalText: string) {
    const { infoBoxClassName, findIconClassName } = this.getBtnsClassName(cellElement);
    const hasInfoBox = document.querySelector(`.info-box.${infoBoxClassName}`);
    const findIcon = document.createElement('div');
    const infoBox = document.createElement('div');

    const onMouseOver = pipe(
      prop<HTMLDivElement>('target'),
      ifElse<HTMLDivElement[], void, void>(
        anyPass([equals(findIcon), equals(this.selectInfoBox(infoBoxClassName))]),
        tap(() => {
          const currentInfoBox = this.selectInfoBox(infoBoxClassName);
          currentInfoBox.classList.add('visible');
          this.calculateTooltipPosition(findIcon, currentInfoBox);
        }),
        tap(() => {
          const currentInfoBox = this.selectInfoBox(infoBoxClassName);
          currentInfoBox?.classList?.remove('visible');
        }),
      ),
    );

    findIcon.className = `find-icon ${findIconClassName}`;
    infoBox.className = `info-box ${infoBoxClassName}`;
    infoBox.textContent = originalText;
    cellElement.appendChild(findIcon);
    !hasInfoBox && document.body.appendChild(infoBox);
    document.body.addEventListener('mouseover', onMouseOver);
  }

  private selectBtnClassName(type: string, fieldName?: string, parentId?: string) {
    return `${type}-${fieldName}-row${parentId}`;
  }

  private getBtnsClassName(cellElement: HTMLDivElement) {
    const parentId = (cellElement.parentNode as HTMLDivElement).dataset.id;
    const infoBoxClassName = this.selectBtnClassName('info-box', cellElement.dataset.field, parentId);
    const findIconClassName = this.selectBtnClassName('find-icon', cellElement.dataset.field, parentId);
    return { infoBoxClassName, findIconClassName };
  }

  public isTextOverflowing(element: HTMLDivElement, originalText: string) {
    return this.getTextHeight(element, originalText) > this.tableCellMaxHeight;
  }

  public setMaxHeight(element: HTMLDivElement) {
    const parent = element.parentNode as HTMLDivElement;
    const hasMaxHeight = parent.className.includes('max-height');
    !hasMaxHeight && parent.classList.add('max-height');
  }

  public truncateText(element: HTMLDivElement, originalText: string, objectNo: string, rowId: string) {
    const span = document.createElement('span');
    // titleWrapper?.removeChild(title);

    let height = this.getTextHeight(element, originalText);
    let truncatedText = originalText;

    // Binary search for the right truncation point
    let start = 0;
    let end = originalText.length;
    let testText = '';

    while (height !== Math.floor(this.tableCellMaxHeight)) {
      const mid = Math.floor((start + end) / 2);
      testText = originalText.substring(0, mid) + '...';
      height = this.getTextHeight(element, testText);
      if (height < this.tableCellMaxHeight) {
        start = mid + 1;
      } else if (height > this.tableCellMaxHeight) {
        end = mid - 1;
      }
    }
    // Apply the truncated text with ellipsis
    truncatedText = testText;
    span.textContent = truncatedText;
    sessionStorage.setItem(`table-${objectNo}-row${rowId}-${element.dataset.field}`, truncatedText);
    sessionStorage.setItem(`table-${objectNo}-row${rowId}-${element.dataset.field}-original-text`, originalText);
    element.appendChild(span);
    element.style.overflow = 'visible';
  }

  public removeIconAndInfoBox(cellElement: HTMLDivElement, originalText: string) {
    const { findIconClassName } = this.getBtnsClassName(cellElement);
    const findIcon = document.querySelector(`.find-icon.${findIconClassName}`);
    cellElement.style.overflow = 'hidden';
    findIcon && (cellElement.innerHTML = originalText);
  }

  public clearTextContent(cellElement: HTMLDivElement) {
    cellElement.style.display = 'block';
    cellElement.textContent = '';
    cellElement.title = '';
  }

  public handleOverflow(cellElement: HTMLDivElement, originalText: string) {
    const { findIconClassName } = this.getBtnsClassName(cellElement);
    const searchIcon = invoker(1, 'querySelector')(`.find-icon.${findIconClassName}`);
    const handleOverflow = pipe(
      searchIcon,
      when(
        isNil,
        tap(() => this.createIconAndInfoBox(cellElement, originalText)),
      ),
    );
    handleOverflow(document);
  }
}

export default TableUtils;
