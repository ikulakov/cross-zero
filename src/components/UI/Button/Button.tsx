import React, { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode
    onClick: (e: any) => void
    style?: any
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({children, onClick, ...props}) => {
    return (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;