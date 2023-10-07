import Text from '@/components/elements/Text';
import { Post } from '@/types/post';
import Link from 'next/link';

const CardBlog: React.FC<Omit<Post, 'user_id'>> = ({
  body,
  title,
  id
}) => {
  return (
    <div className="relative border border-dashed p-4 rounded-md hover:bg-neutral transition-colors">
      <Link href={`/blogs/${id}`} className="absolute inset-0" />

      <Text as="h2" typography="h4" className="mb-2">{title}</Text>

      <Text className="line-clamp-2">{body}</Text>
    </div>
  )
}

export default CardBlog;
