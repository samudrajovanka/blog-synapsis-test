import Container from '@/components/elements/Container';
import Text from '@/components/elements/Text';
import RegisterForm from '@/components/parts/RegisterForm';
import React from 'react'

const Register = () => {
  return (
    <Container as="main">
      <div
        className="w-full max-w-[500px] p-4 my-8 mx-auto border border-dashed rounded-md"
      >
        <Text as="h1" typography="h2" className="mb-5">Register</Text>

        <RegisterForm />
      </div>
    </Container>
  )
}

export default Register;
