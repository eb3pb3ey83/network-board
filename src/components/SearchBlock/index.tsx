import { FrameContentBox } from '@/model/dashboard.model';
import { Block, BlockContainer, BlockTitle, linkStyle } from './style';
import { Link } from 'react-router-dom';

const SearchBlock = ({ data }: FrameContentBox) => {
  return (
    <BlockContainer>
      <Block>
        <BlockTitle>{data.title}</BlockTitle>
        <Link target="_blank" to={data.url as string} style={linkStyle}>
          {data.button}
        </Link>
      </Block>
    </BlockContainer>
  );
};
export default SearchBlock;
