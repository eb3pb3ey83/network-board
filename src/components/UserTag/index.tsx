import { Tag, TagContainer } from './style';

interface Props {
  data: { value: string }[];
}

const UserTag = ({ data }: Props) => {
  if (!data || Object.values(data).length === 0) return <></>;

  return (
    <TagContainer>
      {data.map((item, index) => (
        <Tag key={index}>{item.value}</Tag>
      ))}
    </TagContainer>
  );
};

export default UserTag;
