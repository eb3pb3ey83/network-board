import { ReactNode } from 'react';
import { InfoGroupWrapper } from './style';
import { getColor } from '../CsvDownload/style';
import { addIndex, always, ifElse, map, pipe, splitEvery } from 'ramda';
import { Info } from '../Info';
import { Content } from '../ToggleContentGroup/style';
import { BillElement } from '@/model/dashboard.model';
import { Box } from '@mui/material';

const renderListValue = (value: string[], separator?: string) => {
  if (!separator) return null;
  return (
    <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {value.length === 0 && <Box>-</Box>}
      {value.map((item, index) => (
        <Box sx={{ wordBreak: 'break-all' }} key={index}>
          {index === value.length - 1 ? (!item ? '' : item) : item + separator}
        </Box>
      ))}
    </Box>
  );
};

interface Props {
  column: number;
  children: ReactNode;
}

let listLength: number;
const mapIndexed = addIndex(map<BillElement[], JSX.Element>);
export const getInfo = (data: BillElement[], { lastItemSingle }: { lastItemSingle: boolean }) => {
  return pipe<[arg0: BillElement[]], BillElement[][], BillElement[][], JSX.Element[]>(
    splitEvery(2),
    (list) => {
      listLength = list.length;
      return list;
    },
    mapIndexed((infoItem: BillElement[], index: number) => {
      return ifElse(
        () => index === listLength - 1 && lastItemSingle,
        always(
          <InfoGroup column={1} key={index}>
            {infoItem.map(({ title, value, status, separator }, index) => (
              <Info title={title} key={index} hasBorder>
                <Content sx={{ color: getColor(String(status)) }}>{Array.isArray(value) ? renderListValue(value, separator) : value}</Content>
              </Info>
            ))}
          </InfoGroup>,
        ),
        always(
          <InfoGroup column={2} key={index}>
            {infoItem.map(({ title, value, status, separator }, index) => (
              <Info lastChildPadding title={title} key={index}>
                <Content sx={{ color: getColor(String(status)) }}>{Array.isArray(value) ? renderListValue(value, separator) : value}</Content>
              </Info>
            ))}
          </InfoGroup>,
        ),
      )();
    }),
  )(data);
};

export const InfoGroup = ({ children, column }: Props) => {
  return <InfoGroupWrapper column={column}>{children}</InfoGroupWrapper>;
};
