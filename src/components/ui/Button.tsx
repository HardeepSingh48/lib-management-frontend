import React from 'react';
import type { ButtonProps } from '../../types/ui.types';
import './Button.css';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        children,
        variant = 'primary',
        size = 'medium',
        isLoading = false,
        fullWidth = false,
        className = '',
        disabled,
        ...props
    }, ref) => {
        const classes = [
            'btn',
            `btn-${variant}`,
            `btn-${size}`,
            fullWidth ? 'btn-full-width' : '',
            isLoading ? 'btn-loading' : '',
            className
        ].filter(Boolean).join(' ');

        return (
            <button
                ref={ref}
                className={classes}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <span className="btn-spinner"></span>
                        <span className="btn-loading-text">{children}</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
