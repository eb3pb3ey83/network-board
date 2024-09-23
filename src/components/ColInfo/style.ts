import { styled } from '@mui/material/styles';

export const InfoWrapper = styled('div')((props: { column: number; showContent?: boolean }) => ({
  display: props.showContent ? (props.column > 1 ? 'inline-block' : 'block') : 'none',
  padding: '16px',
  width: `${100 / props.column}%`,
  fontSize: '16px',
  verticalAlign: 'top',
}));

export const InfoTitle = styled('div')({
  color: '#778795',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
});

export const InfoContent = styled('div')(({ color }) => ({
  color: color,
}));
