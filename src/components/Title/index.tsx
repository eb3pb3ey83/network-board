import { ReactNode, useEffect, useState } from 'react';
import { Suffix, TitleDiv } from './style';
import { Box, SxProps, Theme } from '@mui/material';
import { Button } from '../Button';
import { useAllFileDownloadQuery } from '@/state/api/fileDownload';
import { ReactComponent as AlertTriangleStroke } from '@/assets/alert_triangle_stroke.svg';
interface Props {
  name: string;
  hasFlag?: boolean;
  smallText?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  sx?: SxProps<Theme>;
  onMoreBtnClick?: (() => void) | null | Window;
  download_all_url?: string;
  hasPaddingTop?: boolean;
  icon?: string;
}

export const Title = ({ hasPaddingTop, sx, name, prefix, suffix, smallText, onMoreBtnClick, hasFlag = true, icon }: Props) => {
  const [link, setLink] = useState('');
  const { isSuccess } = useAllFileDownloadQuery({ url: link, title: name }, { skip: !link, refetchOnMountOrArgChange: true });

  useEffect(() => {
    isSuccess && setLink('');
  }, [isSuccess]);
  return (
    <TitleDiv sx={() => ({ ...sx })} paddingTop={hasPaddingTop} smallText={smallText} hasFlag={hasFlag}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
        {prefix && prefix}
        {icon === 'Alert_Triangle_Stroke' && <AlertTriangleStroke />}
        <span style={{ fontFamily: 'Public Sans !important' }}>{name}</span>
        {suffix && <Suffix>{suffix}</Suffix>}
      </Box>
      {onMoreBtnClick && (
        <Button sx={{ height: '30px' }} onClick={onMoreBtnClick}>
          查看更多
        </Button>
      )}
      {/* {download_all_url && (
        <Button sx={{ height: '30px' }} onClick={() => setLink(download_all_url)}>
          下載全部
        </Button>
      )} */}
    </TitleDiv>
  );
};

export default Title;
