import { BillContentContainer, BillContentText, BillContentTitle, BillText, BillWrapper, Divide, ToggleButton } from './style';
import { ReactComponent as LinkArrowSVG } from '@/assets/grey-arrow-right.svg';
import { Link } from 'react-router-dom';
import { BillRecv } from '@/model/dashboard.model';
import { Fragment } from 'react';
import { ReactComponent as ArrowSvg } from '@/assets/arrow.svg';
import { Box } from '@mui/system';
import { NoData } from '../NoData';
import { useDispatch, useSelector } from 'react-redux';
import { selectInvoice, setInvoice } from '@/state/slices/componentStateSlice';

interface Props {
  data: BillRecv[];
  showNum?: number;
}

const Invoice = ({ data, showNum }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectInvoice);
  const maxRow = 3;

  return data.length ? (
    <>
      <Box padding={'0 16px'}>
        {data.map((d, index) => {
          if (!isOpen && index >= maxRow) return;
          if (isOpen && index > Number(showNum) - 1) return;

          return (
            <Fragment key={index}>
              <BillWrapper>
                <BillContentContainer>
                  <BillContentTitle>{d.title[0]}</BillContentTitle>
                  <BillContentText>{d.title[1]}</BillContentText>
                </BillContentContainer>
                {d.value ? (
                  <Link
                    target={d.url?.target}
                    to={d.url?.value}
                    style={{ textDecoration: 'inherit', color: 'inherit', cursor: d.url?.value ? 'pointer' : 'default' }}
                  >
                    <BillText sx={{ height: '30px' }}>
                      {d.value}
                      {d.url?.value && <LinkArrowSVG />}
                    </BillText>
                  </Link>
                ) : null}
              </BillWrapper>
              {isOpen ? index + 1 >= data.length ? null : <Divide /> : index + 1 >= maxRow ? null : <Divide />}
            </Fragment>
          );
        })}
      </Box>
      {data.length - 1 >= maxRow && (
        <ToggleButton isOpen={isOpen} onClick={() => dispatch(setInvoice(!isOpen))}>
          <Box>{isOpen ? '顯示較少' : '顯示更多'}</Box>
          <ArrowSvg />
        </ToggleButton>
      )}
    </>
  ) : (
    <NoData />
  );
};
export default Invoice;
