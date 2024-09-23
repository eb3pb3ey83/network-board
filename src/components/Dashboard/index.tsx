import React, { useEffect, useMemo, useRef } from 'react';
import { Board } from '@/components/Board';
import { Masonry } from '@/components/Mansory';
import useDashboard from '@/hooks/useDashboard';
import { LoadingDialog } from '@/components/LoadingDialog';
import DynamicComponent from '@/components/DynamicComponent';
import { Box } from '@mui/material';
import { path } from 'ramda';
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowSvg } from '@/assets/arrow.svg';
import { ToggleButton } from './style';
import { Frame, FrameContentBox } from '@/model/dashboard.model';
import { getMoreBtnMethod } from '../../../utils/getMoreBtnMethod';
import { ManagerHeader } from '../ManagerHeader';

import useMeasureData from '@/hooks/useMeasureData';
import { CMQualityResultDialog } from '../CMQualityResultDialog';
import useFilterAdviceFrames from '@/hooks/useFilterAdviceFrames';
import useFinalData from '@/hooks/useFinalData';
import { useSelector } from 'react-redux';
import { selectDisplay } from '@/state/slices/userInfoSlice';
import { UserNoticeDialog } from '../UserNoticeDialog';

interface RenderContentBox {
  contentBox: FrameContentBox[];
  colSpan?: number;
  openNum?: number;
  showNum?: number;
}

// 定義組件屬性類型
type Props = {};

const isFloatBoxOverflow = (box: HTMLDivElement | null) => {
  if (!box) return;
  const margin = 36;
  if (box.offsetHeight > window.innerHeight - margin) {
    box.style.maxHeight = 'calc(100vh - 36px)';
    box.style.overflow = 'auto';
  }
};

// 定義 content_box 的渲染函數
const renderContentBox = ({ contentBox, colSpan, openNum, showNum }: RenderContentBox) => {
  return contentBox.map((content) => {
    return <DynamicComponent key={content.id} openNum={openNum} showNum={showNum} content={content} colSpan={colSpan} />;
  });
};

// 定義 board 的渲染函數
const renderBoard = (frames: Frame[], hasFloat?: boolean, boxRef?: React.RefObject<HTMLDivElement>) =>
  frames.map(({ id, col_span, content_box, header, footer, open_num, show_num }) => (
    <Board data-colspan={col_span} key={id} sx={{ marginBottom: hasFloat ? '36px' : 0 }}>
      <div ref={boxRef} className="float-box">
        {header.display && <></>}
        {renderContentBox({ contentBox: content_box, colSpan: col_span, openNum: open_num, showNum: show_num })}
        {footer.display && (
          <ToggleButton
            onClick={() => {
              const btn = { ...footer.data, url: footer.data.value };
              const action = getMoreBtnMethod(btn);
              action && action();
            }}
          >
            <Box sx={{ fontFamily: 'Public Sans !important' }}>{footer.data.title}</Box>
            <ArrowSvg />
          </ToggleButton>
        )}
      </div>
    </Board>
  ));

// 定義容器樣式函數
const getContainerStyles = (hasFloat?: boolean, fullscreen?: boolean) => ({
  display: hasFloat ? 'grid' : 'block',
  columnGap: hasFloat || fullscreen ? '18px' : '0',
  gridTemplateColumns: '1fr 2fr',
});

const Dashboard: React.FC<Props> = () => {
  const params = useParams<{ role: string }>();
  const role = params.role ?? '';
  const data = useDashboard(role);
  const display = useSelector(selectDisplay);
  const fullScreen = display === 'h';
  const hasFloat = path<boolean>(['layout_data', 'has_float'], data);
  const headerComponent = <ManagerHeader fullScreen={fullScreen} name={data?.company_name}></ManagerHeader>;
  const header = useMemo(() => (role === 'esso' && !fullScreen ? { header: headerComponent } : {}), [data]);
  const { isLoadingDialogOpen, searchWording, top } = useMeasureData(role);
  useFilterAdviceFrames();
  const finalData = useFinalData();
  // 獲取容器的樣式
  const containerStyles = getContainerStyles(hasFloat, Boolean(fullScreen));
  const threeColumn = fullScreen && !hasFloat;
  const boxRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver>();

  useEffect(() => {
    if (!finalData) return;
    const box = boxRef.current;
    observer.current = new ResizeObserver(() => {
      isFloatBoxOverflow(box);
    });
    box && observer.current.observe(box);
    window.addEventListener('resize', () => isFloatBoxOverflow(box));
  }, [finalData]);

  // 渲染組件
  return finalData ? (
    <>
      {fullScreen && role === 'esso' && headerComponent}
      <Box sx={containerStyles}>
        <UserNoticeDialog noticeData={data.layout_data.notice}></UserNoticeDialog>
        <LoadingDialog top={top} open={isLoadingDialogOpen} searchWording={searchWording} />
        <CMQualityResultDialog />
        {hasFloat && <div style={{ margin: '36px 0 0 36px' }}>{renderBoard(finalData.layout_data.float_box, hasFloat, boxRef)}</div>}
        <Masonry hasFloat={hasFloat} fullScreen={fullScreen} column={threeColumn ? 3 : 2} {...header}>
          {renderBoard(finalData.layout_data.frames)}
        </Masonry>
      </Box>
    </>
  ) : (
    <LoadingDialog top={import.meta.env.VITE_DIALOG_TOP} open searchWording={import.meta.env.VITE_SEARCH_WORDING} />
  );
};

export default Dashboard;
