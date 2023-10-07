import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import LoginForm from '@/components/parts/LoginForm';
import React from 'react'

const Login = () => {
  return (
    <Container as="main">
      <div
        className="w-full max-w-[500px] p-4 my-8 mx-auto border border-dashed rounded-md"
      >
        <Text as="h1" typography="h2" className="mb-5">Login</Text>

        <LoginForm />
      </div>
    </Container>
  )
}

export default Login;
