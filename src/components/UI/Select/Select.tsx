import React from 'react';
import { Option } from '../../../types/types'

interface SelectProps {
    options: Array<Option>,
    value: string
    defaultValue: string,
    required?: boolean
    onChange: (e: any) => void
}

const Select: React.FC<SelectProps> = ({options, defaultValue, value, onChange, ...props}) => {
    return (
        <div>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                {...props}
            >
                <option disabled value=''>{defaultValue}</option>
                {options.map( (option, index )=> (
                    <option key={index} value={option.value} >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;