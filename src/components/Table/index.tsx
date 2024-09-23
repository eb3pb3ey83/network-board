import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { forEach, prop } from 'ramda';
// import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { useEffect, useRef } from 'react';
import TableUtils from './utils';

interface Props {
  rows: any[];
  columns: readonly GridColDef<any>[];
  objectNo: string
}

const utils = new TableUtils();

const Table = ({ rows, columns, objectNo }: Props) => {
  const apiRef = useGridApiRef();
  const isInitial = useRef(false);

  useEffect(() => {
    const handleCellOverflow = (rowId: string, field: string) => {
      const cellElement = apiRef.current.getCellElement(rowId, field);
      const originalText = apiRef.current.getCellValue(rowId, field);

      if (cellElement && utils.isTextOverflowing(cellElement, originalText)) {
        utils.setMaxHeight(cellElement);
        utils.clearTextContent(cellElement);
        utils.handleOverflow(cellElement, originalText);
        utils.truncateText(cellElement, originalText, objectNo, rowId);
      } else {
        cellElement && (cellElement.parentNode as HTMLDivElement).classList.remove('max-height');
        cellElement && utils.removeIconAndInfoBox(cellElement, originalText);
      }
    };

    const detectCellOverflow = () => {
      if (!apiRef.current) return;
      const allRowIds = apiRef.current.getAllRowIds();
      const columnFields = apiRef.current.getAllColumns().map(prop('field'));

      forEach<any>((rowId: string) => {
        forEach((field: string) => {
          handleCellOverflow(rowId, field);
        }, columnFields);
      }, allRowIds);
    };

    const getCellsAfterRender = () => {
      setTimeout(detectCellOverflow, !isInitial.current ? 0 : 200);

      if (!isInitial.current) {
        isInitial.current = true;
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(getCellsAfterRender);
    });

    window.addEventListener('resize', getCellsAfterRender);
    return () => window.removeEventListener('resize', getCellsAfterRender);
  }, [apiRef]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      classes={{
        main: 'table-main',
        columnHeaders: 'table-headers',
        columnHeader: 'table-header',
        row: 'table-row',
        virtualScroller: 'table-virtual-scroller',
        virtualScrollerContent: 'table-content',
        virtualScrollerRenderZone: 'table-render-zone',
        columnHeaderTitle: 'table-header-title',
        cell: 'table-cell',
        cellEmpty: 'table-cell-empty',
      }}
      autoHeight
      disableRowSelectionOnClick
      disableColumnMenu
      disableColumnFilter
      disableColumnSorting
      hideFooter
      apiRef={apiRef}
    />
  );
};
export default Table;
