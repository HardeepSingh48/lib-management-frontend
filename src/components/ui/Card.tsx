import React from 'react';
import type { CardProps } from '../../types/ui.types';
import './Card.css';

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    variant = 'default'
}) => {
    const classes = [
        'card',
        `card-${variant}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {children}
        </div>
    );
};
