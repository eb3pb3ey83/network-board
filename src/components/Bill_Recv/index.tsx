import { BillContentContainer, BillContentText, BillContentTitle, BillTitle, BillWrapper, Divide, ToggleButton } from './style';
import { BillRecv, BillRecvClass } from '@/model/dashboard.model';
import { Fragment } from 'react';
import { ReactComponent as ArrowSvg } from '@/assets/arrow.svg';
import { Box } from '@mui/system';
import { NoData } from '../NoData';
import { useDispatch, useSelector } from 'react-redux';
import { selectBillRecv, setBillRecv } from '@/state/slices/componentStateSlice';

interface Props {
  data: BillRecv[];
  title: string;
  more?: BillRecvClass | null;
}

const Bill_Recv = ({ data }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectBillRecv);
  const maxRow = 3;

  return data.length ? (
    <>
      <Box padding={'16px 16px 0px 16px'}>
        {data.map((d, index) => {
          if (!isOpen && index >= maxRow) return;
          return (
            <Fragment key={index}>
              <BillWrapper>
                <BillTitle>{d.value}</BillTitle>
                <BillContentContainer>
                  <BillContentTitle>{d.title[0]}</BillContentTitle>
                  <BillContentText>{d.title[1]}</BillContentText>
                </BillContentContainer>
              </BillWrapper>
              {isOpen ? index + 1 >= data.length ? null : <Divide /> : index + 1 >= maxRow ? null : <Divide />}
            </Fragment>
          );
        })}
      </Box>
      {data.length - 1 >= maxRow && (
        <ToggleButton isOpen={isOpen} onClick={() => dispatch(setBillRecv(!isOpen))}>
          <Box>{isOpen ? '顯示較少' : '顯示更多'}</Box>
          <ArrowSvg />
        </ToggleButton>
      )}
    </>
  ) : (
    <NoData />
  );
};

export default Bill_Recv;
