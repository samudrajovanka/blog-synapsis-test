export type FormControlProps = React.PropsWithChildren & {
  htmlFor?: string;
  label: string;
  labelAlt?: string;
  error?: string;
  description?: string;
  descriptionAlt?: string;
  isBlock?: boolean;
  className?: string;
  isRequired?: boolean;
};
