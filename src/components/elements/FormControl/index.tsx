import { useMemo } from 'react';

import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

import { FormControlProps } from './types';

const FormControl: React.FC<FormControlProps> = ({
  children,
  htmlFor,
  label,
  labelAlt,
  error,
  description,
  descriptionAlt,
  isBlock,
  className,
  isRequired
}) => {
  const maxWidthClassName = useMemo(() => (isBlock ? 'max-w-full' : 'max-w-xs'), [isBlock]);
  const finalClassName = useMemo(
    () => twMerge('form-control w-full', maxWidthClassName, className),
    [className, maxWidthClassName]
  );

  return (
    <div className={finalClassName}>
      {label || labelAlt ? (
        <div className="label">
          {label ? (
            <label
              className={cx('label-text', {
                'after:content-["*"] after:text-error': isRequired
              })}
              htmlFor={htmlFor}
            >
              {label}
            </label>
          ) : null}

          {labelAlt ? <span className="label-text-alt flex-1 text-end">{labelAlt}</span> : null}
        </div>
      ) : null}

      {children}

      {description || descriptionAlt || error ? (
        <label className="label">
          {description && !error ? <span className="label-text-alt">{description}</span> : null}

          {error ? <span className="label-text-alt text-error">{error}</span> : null}

          {descriptionAlt ? (
            <span className="label-text-alt flex-1 text-end">{descriptionAlt}</span>
          ) : null}
        </label>
      ) : null}
    </div>
  );
};

export default FormControl;
