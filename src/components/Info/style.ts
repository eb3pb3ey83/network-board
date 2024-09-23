import { styled } from '@mui/material';

export const InfoWrapper = styled('div')((props: { hasBorder?: boolean; lastChildPadding?: boolean }) => ({
  padding: '14px 0',
  borderBottom: props.hasBorder ? '1px dashed #E5E8EB' : 'none',
  width: '100%',

  '&:last-child': {
    paddingBottom: props.lastChildPadding ? '14px' : 0,
    border: 'none',
  },
}));

export const InfoTitle = styled('div')({
  color: '#778795',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
});
