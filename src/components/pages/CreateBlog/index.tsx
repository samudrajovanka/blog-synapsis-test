import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import CreateBlogForm from '@/components/parts/CreateBlogForm';

const CreateBlog = () => {
  return (
    <Container as="main">
      <div
        className="w-full max-w-[500px] p-4 my-8 mx-auto border border-dashed rounded-md"
      >
        <Text as="h1" typography="h2" className="mb-5">Create Blog</Text>

        <CreateBlogForm />
      </div>
    </Container>
  )
}

export default CreateBlog;
