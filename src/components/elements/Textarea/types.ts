export type TextAreaProps = (
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
) & {
  placeholder?: string;
  className?: string;
  isBlock?: boolean;
  isRequired?: boolean;
  error?: string;
};
