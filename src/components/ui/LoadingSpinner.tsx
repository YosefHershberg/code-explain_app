import { cn } from "@/lib/utils"
import { forwardRef } from 'react';

interface LoadingSpinnerProps {
    className?: string;
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(({ className }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]",
                className
            )}
            role="status"
        >
        </div>
    );
});

export default LoadingSpinner;