import { memo, useEffect, useRef, useState } from 'react';
import TableUtils from '../Table/utils';

const utils = new TableUtils();

export const Cell = memo(({ value, idx, objectNo }: any) => {
  const [truncatedText, setTruncatedText] = useState('');

  useEffect(() => {
    const parent = (cellRef.current as HTMLDivElement).parentNode as HTMLDivElement;
    const row = parent.parentNode as HTMLDivElement;
    const rowId = row.dataset.id;
    const truncatedText = sessionStorage.getItem(`table-${objectNo}-row${rowId}-field${idx + 1}`) ?? '';
    const originalText = sessionStorage.getItem(`table-${objectNo}-row${rowId}-field${idx + 1}-original-text`) ?? '';

    if (truncatedText) {
      setTruncatedText(truncatedText);
      utils.handleOverflow(parent, originalText);
    }
  }, []);

  const cellRef = useRef<HTMLDivElement>(null);
  return <div ref={cellRef}>{truncatedText ? truncatedText : value}</div>;
});
