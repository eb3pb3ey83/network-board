import { selectColInfo } from '@/state/slices/colInfoSlice';
import { InfoContent, InfoTitle, InfoWrapper } from './style';
import { useSelector } from 'react-redux';
import { SxProps, Theme } from '@mui/material';
import { equals } from 'ramda';

interface Props {
  sx?: SxProps<Theme>;
  objectNo: string;
  column?: number;
}

const renderList = (list: string[]) => {
  return list.map((value) => (
    <>
      {value}
      <br />
    </>
  ));
};

const ColInfo = ({ objectNo, sx, column = 2 }: Props) => {
  const colInfo = useSelector(selectColInfo);
  const info = colInfo[objectNo].data;
  const style = colInfo[objectNo].style;
  const warning = style.color;
  const showContent = style.display === false ? false : true;
  const isEmptyObj = equals(info.value, {});
  const isList = Array.isArray(info.value);

  return (
    <InfoWrapper sx={() => ({ ...sx })} showContent={showContent} column={column}>
      <InfoTitle>{info.title}</InfoTitle>
      <InfoContent color={warning ? warning : '#212B36'}>{isEmptyObj ? '' : isList ? renderList(info.value) : info.value}</InfoContent>
    </InfoWrapper>
  );
};

export default ColInfo;
