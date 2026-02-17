import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg bg-white p-6 shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
