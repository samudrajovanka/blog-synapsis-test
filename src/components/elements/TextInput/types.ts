export type TextInputProps = (
  React.InputHTMLAttributes<HTMLInputElement>
) & {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  className?: string;
  isBlock?: boolean;
  isRequired?: boolean;
  error?: string;
};
