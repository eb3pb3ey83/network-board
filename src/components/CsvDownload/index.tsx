import { useEffect, useState } from 'react';
import { CsvDownloadBox, CsvDownloadStatus, CsvDownloadTitle, CsvDownloadUnit } from './style';
// import { ReactComponent as DownloadSvg } from '@/assets/download.svg';
import { useFileDownloadQuery } from '@/state/api/fileDownload';
import { BillRecvClass } from '@/model/dashboard.model';

interface Props {
  url?: BillRecvClass | null;
  title: string;
  value?: number | string;
  link?: string;
  unit?: string;
  status: string | null;
  subTitle?: string;
}

export const CsvDownload = ({ title, value, unit, status, subTitle }: Props) => {
  const [link, setLink] = useState('');
  const { isSuccess } = useFileDownloadQuery({ url: link, title: subTitle }, { skip: !link, refetchOnMountOrArgChange: true });
  const isNumber = !Number.isNaN(Number(value));
  useEffect(() => {
    isSuccess && setLink('');
  }, [isSuccess]);

  return (
    <CsvDownloadBox>
      <CsvDownloadTitle dangerouslySetInnerHTML={{ __html: title }}></CsvDownloadTitle>
      <CsvDownloadStatus status={status}>
        {isNumber && <span>{value}</span>}
        {isNumber && unit && value !== '' && <CsvDownloadUnit>{unit}</CsvDownloadUnit>}
        {!isNumber && value !== '' && <CsvDownloadUnit>{value}</CsvDownloadUnit>}
        {/* {value === '' && <CsvDownloadEmpty></CsvDownloadEmpty>} */}
      </CsvDownloadStatus>

      {/* {value !== '' && !!url && (
        <CsvDownloadButtonWrapper>
          <CsvDownloadLink onClick={() => url && setLink(url.value)}>
            <DownloadSvg />
          </CsvDownloadLink>
        </CsvDownloadButtonWrapper>
      )} */}
    </CsvDownloadBox>
  );
};
