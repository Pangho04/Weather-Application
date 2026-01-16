import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  styleProps?: string;
};

function Box({ children, styleProps = '' }: Props) {
  return (
    <div className={twMerge(`flex justify-center items-center ${styleProps}`)}>{children}</div>
  );
}

export default Box;
