import Text from '@/components/elements/Text';
import { Comment } from '@/types/post';

const CardComment: React.FC<Comment> = ({
  body,
  email,
  name
}) => {
  return (
    <div>
      <div>
        <Text as="h4" typography="h4">{name}</Text>
        <Text typography="xs" className="text-neutral-500">{email}</Text>
      </div>

      <Text className="mt-2">{body}</Text>
    </div>
  )
}

export default CardComment;
