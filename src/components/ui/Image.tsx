import { forwardRef } from 'react';
import { type ClassValue } from "clsx"
import { cn } from '@/lib/utils'

interface ImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: ClassValue;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, fill, className }, ref) => {
    return (
      <div className="relative w-full h-full">
        <img
          loading='lazy'
          ref={ref}
          src={src}
          alt={alt}
          className={cn('rounded-lg', fill ? 'object-fill' : 'object-cover', className)}
        />
      </div>
    );
  }
);

export default Image;
