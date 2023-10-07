type Typography = 'h1' | 'h2' | 'h3' | 'h4' | 'md' | 'sm' | 'xs';

export type TextProps = React.PropsWithChildren & {
  as?: React.ElementType;
  className?: string;
  typography?: Typography;
};
