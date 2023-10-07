import { forwardRef, useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

import { TextAreaProps } from './types';

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, className, isBlock, ...props }, ref) => {
    const maxWidthClassName = useMemo(() => (isBlock ? 'max-w-full' : 'max-w-xs'), [isBlock]);
    const inputBasicClassName = 'textarea input-bordered';
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
      <textarea
        ref={ref}
        placeholder={placeholder}
        className={finalClassName}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
