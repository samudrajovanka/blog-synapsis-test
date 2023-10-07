import { useMemo } from 'react';

import { twMerge } from 'tailwind-merge';

import { TextProps } from './types';

const Text: React.FC<TextProps> = ({ as: Component = 'p', children, typography, className }) => {
  const typhographyClassName = useMemo(() => {
    switch (typography) {
      case 'h1':
        return 'text-4xl font-bold';
      case 'h2':
        return 'text-2xl font-bold';
      case 'h3':
        return 'text-xl font-bold';
      case 'h4':
        return 'text-base font-bold';
      case 'md':
        return 'text-xl';
      case 'sm':
        return 'text-base';
      case 'xs':
        return 'text-sm';
      default:
        return 'text-base';
    }
  }, [typography]);

  const fincalClassName = useMemo(
    () => twMerge(typhographyClassName, 'text-white', className),
    [typhographyClassName, className]
  );

  return <Component className={fincalClassName}>{children}</Component>;
};

export default Text;
