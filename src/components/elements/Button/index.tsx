'use client';

import React, { useMemo } from 'react';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  className,
  href,
  isLoading,
  loadingText,
  ...props
}) => {
  const finalClassName = useMemo(() => twMerge('btn btn-primary', className), [className]);

  if (href) {
    return (
      <Link href={href}>
        <button type="button" className={finalClassName} {...props}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={finalClassName}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
