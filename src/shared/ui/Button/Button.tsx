import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: 'primary' | 'secondary';
}

export function Button({
  children,
  variant = 'primary',
  className,
  onClick,
  disabled,
  type = 'button',
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant}${className ? ` ${className}` : ''}`}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {children}
    </button>
  );
}
