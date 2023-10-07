export type ButtonProps = React.PropsWithChildren & {
  type: 'button' | 'submit';
  className: string
  href?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
};
