import React from 'react';
import { ButtonProps } from './interface';
import './button.scss'

const Button: React.FC<ButtonProps> = ({ type, title, onclick }) => {
    return (
        <button className={`button ${type}`} onClick={onclick}>
            {title}
        </button>
    )
};

export { Button }