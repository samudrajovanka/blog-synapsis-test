import React from 'react';

import { twMerge } from 'tailwind-merge';

import { ContainerProps } from './types';

const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = 'div',
  className
}) => (
  <Component className={twMerge('container mx-auto px-4', className)}>{children}</Component>
);

export default Container;
