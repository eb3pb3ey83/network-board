import { styled } from '@mui/material';
import { background } from '../CMQuality/style';
export const getColor = (status?: string | null) => {
  switch (status) {
    case '1':
      return background['green'].mainColor;
    case '2':
      return background['orange'].mainColor;
    case '3':
      return background['red'].mainColor;
    case '4':
      return background['grey'].mainColor;
    default:
      return '#212B36';
  }
};
export const CsvDownloadBox = styled('div')({
  padding: '16px',
  borderRadius: '10px',
  background: '#F4F6F8',
  width: '100%',
  height: '130px',
  display: 'grid',
  gridTemplateAreas: `
    'title title'
    'status button'
  `,
  gridTemplateRows: 'min-content min-content',
  gridTemplateColumns: 'repeat(2, 1fr)',
  alignContent: 'space-between',
});

export const CsvDownloadTitle = styled('div')({
  gridArea: 'title',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 600,
  color: '#454F5B',
});

export const CsvDownloadStatus = styled('div')(({ status }: { status?: string | null }) => ({
  gridArea: 'status',
  display: 'flex',
  alignItems: 'center',
  fontSize: '36px',
  fontStyle: 'normal',
  fontWeight: 700,
  color: getColor(status),
  lineHeight: '21px',
}));

export const CsvDownloadUnit = styled('span')({
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 800,
  paddingLeft: '5px',
  alignSelf: 'flex-end',
  lineHeight: '18px',
  whiteSpace: 'nowrap',
});

export const CsvDownloadButtonWrapper = styled('div')({
  gridArea: 'button',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const CsvDownloadLink = styled('a')({
  width: '28px',
  height: '28px',
  background: 'rgba(255, 164, 27, 0.20)',
  borderRadius: '50%',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});

export const CsvDownloadEmpty = styled('div')({
  width: '10px',
  height: '4px',
  background: '#778795',
});
