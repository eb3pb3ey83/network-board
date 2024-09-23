import { Accordion } from '../Accordion';
import { Info } from '../Info';
import { Content } from '../ToggleContentGroup/style';
import { accordionListStyle } from '../Accordion/style';
import { NoData } from '../NoData';
import { Box } from '@mui/material';
import { ReactComponent as ArrowSvg } from '@/assets/arrow.svg';
import { ToggleButton } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccordationGroup, selectIsPageInitialize, setAccordationGroup } from '@/state/slices/componentStateSlice';

interface RowInfoGroupContentData {
  id: number;
  title: string;
  value: string;
  status: null;
  url: null;
}

interface RowInfoGroupData {
  id: number;
  createtime: string;
  item: string;
  content: RowInfoGroupContentData[];
}

interface Props {
  data: RowInfoGroupData[];
  openNum: number;
  showNum: number;
  objectNo: string;
}

const RowInfoGroup = ({ data, openNum, showNum, objectNo }: Props) => {
  const openState = useSelector(selectAccordationGroup);
  const isOpen = openState[objectNo];
  const dispatch = useDispatch();
  const isPageInitialize = useSelector(selectIsPageInitialize);

  return data.length ? (
    <>
      <Box sx={{ padding: '0 16px 16px 16px' }}>
        {data.map((item, index) => {
          if (!isOpen && index >= showNum) return;
          return (
            <Accordion shouldOpenInStart={!isPageInitialize && openNum - 1 === index} index={item.id} key={index} title={item.createtime}>
              {item.content.map((con, idx) => (
                <Info key={idx} sx={accordionListStyle} title={con.title}>
                  <Content>{con.value}</Content>
                </Info>
              ))}
            </Accordion>
          );
        })}
      </Box>
      {data.length - 1 > showNum && (
        <ToggleButton isOpen={isOpen} onClick={() => dispatch(setAccordationGroup({ isOpen: !isOpen, objectNo }))}>
          <Box>{isOpen ? '顯示較少' : '顯示更多'}</Box>
          <ArrowSvg />
        </ToggleButton>
      )}
    </>
  ) : (
    <NoData />
  );
};

export default RowInfoGroup;
