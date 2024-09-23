import { BillText, BillTitle, BillWrapper, Divide, ToggleButton } from './style';
import { ReactComponent as LinkArrowSVG } from '@/assets/grey-arrow-right.svg';
import { Link } from 'react-router-dom';
import { BillElement, BillRecvClass } from '@/model/dashboard.model';
import { Fragment } from 'react';
import { ReactComponent as ArrowSvg } from '@/assets/arrow.svg';
import { Box } from '@mui/system';
import { NoData } from '../NoData';
import { getColor } from '../CsvDownload/style';
import { useDispatch, useSelector } from 'react-redux';
import { selectBill, setBill } from '@/state/slices/componentStateSlice';

interface Props {
  data: BillElement[];
  title: string;
  more?: BillRecvClass | null;
  showNum?: number;
}

const Bill = ({ data, showNum }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectBill);
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
                <BillTitle>{d.value}</BillTitle>
                {d.title && d.url?.value && (
                  <Link to={d.url?.value} target={d.url.target} style={{ color: getColor(String(d.status)), textDecoration: 'inherit' }}>
                    <BillText sx={{ height: '30px' }}>
                      {d.title}
                      <LinkArrowSVG />
                    </BillText>
                  </Link>
                )}
                {d.title && !d.url && <BillText sx={{ height: '30px', color: getColor(String(d.status)) }}>{d.title}</BillText>}
              </BillWrapper>
              {isOpen ? index + 1 >= data.length ? null : <Divide /> : index + 1 >= maxRow ? null : <Divide />}
            </Fragment>
          );
        })}
      </Box>
      {data.length - 1 >= maxRow && (
        <ToggleButton isOpen={isOpen} onClick={() => dispatch(setBill(!isOpen))}>
          <Box>{isOpen ? '顯示較少' : '顯示更多'}</Box>
          <ArrowSvg />
        </ToggleButton>
      )}
    </>
  ) : (
    <NoData />
  );
};

export default Bill;
