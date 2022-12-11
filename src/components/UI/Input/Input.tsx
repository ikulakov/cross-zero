import React from 'react';

interface InputProps {
    value: string | number
    name: string
    onChange?: (e: any) => void
    required?: boolean
}

const Input: React.FC<InputProps> = ({...props}) => {
    return (
        <div>
            <input {...props} />
        </div>
    );
};

export default Input;