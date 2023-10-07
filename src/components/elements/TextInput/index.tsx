import { forwardRef, useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

import { TextInputProps } from './types';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = 'text', placeholder, className, isBlock, ...props }, ref) => {
    const maxWidthClassName = useMemo(() => (isBlock ? 'max-w-full' : 'max-w-xs'), [isBlock]);
    const inputBasicClassName = 'input input-bordered';
    const finalClassName = useMemo(
      () =>
        twMerge(
          'w-full',
          inputBasicClassName,
          maxWidthClassName,
          className
        ),
      [className, maxWidthClassName, inputBasicClassName]
    );

    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={finalClassName}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
