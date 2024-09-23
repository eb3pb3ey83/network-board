import { ContentData, URLClass } from '@/model/dashboard.model';
import { CsvDownload } from '../CsvDownload';
import { FileInfoContainer } from './style';
interface Data extends ContentData {
  status: string;
  url: URLClass;
  title: string;
  value: string;
}

interface Props {
  data: Data;
}
const FileInfo = ({ data }: Props) => {
  return Number(data.value) ? (
    <FileInfoContainer>
      <CsvDownload subTitle={data.sub_title} status={data.status} url={data.url} title={data.title} value={data.value} unit="戶"></CsvDownload>
    </FileInfoContainer>
  ) : (
    <></>
  );
};

export default FileInfo;
