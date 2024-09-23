import { NoData } from '../NoData';
import { Box } from '@mui/material';
import { FrameContentBox, TableColumn, TableListData } from '@/model/dashboard.model';
import { addIndex, fromPairs, map, mergeAll } from 'ramda';
import Table from '../Table';
import { GridColDef } from '@mui/x-data-grid';
import { Cell } from '@/components/Cell'

interface Props {
  content: FrameContentBox;
}

const mapIndexed = addIndex<any>(map);
const RowInfoGroupTable = ({ content }: Props) => {
  if (!content.data.list_data) return <Box>test</Box>;
  const listData = content.data.list_data as TableListData;
  const titles = listData.title;
  const widths = content.style.width as string[];
  const columnsData = listData.column;

  if (!columnsData) {
    return <NoData />;
  }

  // 生成 columns
  const columns: GridColDef<any>[] = addIndex(map)(
    (title: any, idx: number) => ({
      field: `field${idx + 1}`,
      headerName: title,
      ...(widths[idx] ? { width: parseInt(widths[idx]) } : { flex: 1 }),
      renderCell: ({ formattedValue }: any) => {
        return <Cell objectNo={content.object_no} idx={idx} value={formattedValue} />;
      }
    }),
    titles,
  );

  // 生成 rows
  const rows = mapIndexed(
    (column: TableColumn, idx) =>
      mergeAll([{ id: idx }, fromPairs<any>(addIndex(map)((value, fieldIdx) => [`field${fieldIdx + 1}`, value], column.value))]),
    columnsData,
  );

  return content ? <Table objectNo={content.object_no} rows={rows} columns={columns} /> : <NoData />;
};

export default RowInfoGroupTable;
