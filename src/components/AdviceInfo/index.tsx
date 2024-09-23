import { Box, SxProps, Theme } from '@mui/material';
import { Info } from '../Info';
import { Advice, AdviceContainer, AdviceTitle, AdviceWrapper } from './style';
import { ContentStyle } from '@/model/dashboard.model';

interface Props {
  title: string;
  value: string;
  colSpan: number;
  style?: ContentStyle;
  sx?: SxProps<Theme>;
}

const AdviceInfo = ({ style, title, value, colSpan = 1, sx }: Props) => {
  return (
    <AdviceContainer sx={() => ({ ...sx })}>
      <AdviceWrapper colSpan={colSpan} background={style?.background_color}>
        <Advice>
          <AdviceTitle fontColor={style?.font_color}>{title}</AdviceTitle>
          {value && (
            <Info sx={{ padding: '0 0 16px' }} title="建議處置">
              <Box sx={{ fontSize: '16px' }}>{value}</Box>
            </Info>
          )}
        </Advice>
      </AdviceWrapper>
    </AdviceContainer>
  );
};

export default AdviceInfo;
