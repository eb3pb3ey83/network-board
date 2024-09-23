import { styled } from '@mui/system';

export const background = {
  grey: {
    mainColor: '#B0B9C2',
    subColor: '#E5E8EB',
  },
  red: {
    mainColor: '#DD060E',
    subColor: '#FBD2D3',
  },
  green: {
    mainColor: '#0CAE7D',
    subColor: '#AEF3CE',
  },
  orange: {
    mainColor: '#FFA41B',
    subColor: '#FFEAB5',
  },
};

// An interface for our actions
interface ColorAction {
  type: string;
}

// An interface for our state
interface ColorState {
  mainColor: string;
  subColor: string;
}

export const percentColorReducer = (_state: ColorState, action: ColorAction) => {
  switch (action.type) {
    case 'red':
      return background['red'];
    case 'green':
      return background['green'];
    case 'orange':
      return background['orange'];
    default:
      return background['grey'];
  }
};

export const CMQualityWrapper = styled('div')({
  position: 'relative',
  margin: 'auto',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  padding: '14px',
  minHeight: '60px',

  '&:last-child': {
    borderBottom: 'none',
  },
});

export const CMQualityTitle = styled('div')({
  color: '#212B36',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 700,
  gridArea: 'title',
  whiteSpace: 'nowrap',
});

export const CMQualityLight = styled('div')((props: { mainColor?: string; subColor?: string; percent?: boolean }) => ({
  background: props.mainColor,
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: `3px solid ${props.subColor}`,
  marginTop: props.percent ? '5px' : '2px',
}));

export const CMQualityInfoWrapper = styled('div')((props: { percent?: boolean }) => ({
  display: 'grid',
  justifyContent: 'space-between',
  flex: '1',
  alignItems: 'center',
  rowGap: '5px',
  gridTemplateColumns: 'min-content min-content',
  gridTemplateAreas: props.percent
    ? `
  'title status'
  'progressbar progressbar'
  `
    : `
  'title status'
  `,
}));

export const CMQualityPercentText = styled('div')({
  color: '#212B36',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  gridArea: 'status',
});

export const CMQualityPercent = styled('span')({
  fontSize: '14px',
});

export const CMQualityStatus = styled('div')({
  color: '#637381',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 700,
  gridArea: 'status',
  whiteSpace: 'nowrap',
});

export const CMQualityBarWrapper = styled('div')((props: { color?: string }) => ({
  background: props.color,
  width: '100%',
  height: '3px',
  borderRadius: '8px',
  gridArea: 'progressbar',
}));

export const CMQualityBar = styled('div')((props: { color?: string; percent: boolean }) => ({
  background: props.color,
  width: props.percent + '%',
  height: '100%',
}));
