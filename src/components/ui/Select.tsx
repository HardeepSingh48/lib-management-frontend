import React from 'react';
import type { SelectProps } from '../../types/ui.types';
import './Select.css';

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, helperText, options, className = '', id, children, ...props }, ref) => {
        const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className="select-wrapper">
                {label && (
                    <label htmlFor={selectId} className="select-label">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    className={`select ${error ? 'select-error' : ''} ${className}`}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
                    {...props}
                >
                    {children || options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <span id={`${selectId}-error`} className="select-error-message">
                        {error}
                    </span>
                )}
                {!error && helperText && (
                    <span id={`${selectId}-helper`} className="select-helper-text">
                        {helperText}
                    </span>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
