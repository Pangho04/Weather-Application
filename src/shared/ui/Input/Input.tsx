import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input className={className ? `input ${className}` : 'input'} {...props} />;
}
