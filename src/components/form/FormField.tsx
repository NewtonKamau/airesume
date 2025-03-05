import React, { useState, useEffect, ChangeEvent } from 'react';

interface FormFieldProps {
label: string;
name: string;
type?: 'text' | 'email' | 'number' | 'tel' | 'url';
placeholder?: string;
value: string | number;
onChange: (e: ChangeEvent<HTMLInputElement>) => void;
required?: boolean;
error?: string;
disabled?: boolean;
autoComplete?: string;
helperText?: string;
className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
label,
name,
type = 'text',
placeholder = '',
value,
onChange,
required = false,
error,
disabled = false,
autoComplete,
helperText,
className = '',
}) => {
const [isFocused, setIsFocused] = useState(false);
const [touched, setTouched] = useState(false);
const [localError, setLocalError] = useState<string | undefined>(error);

// Update local error state when prop changes
useEffect(() => {
    setLocalError(error);
}, [error]);

const handleBlur = () => {
    setIsFocused(false);
    setTouched(true);
    
    // Simple validation on blur
    if (required && !value) {
    setLocalError(`${label} is required`);
    }
};

const handleFocus = () => {
    setIsFocused(true);
};

const id = `field-${name}`;

return (
    <div className={`mb-4 ${className}`}>
    <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
        data-required={required}
    >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    
    <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!localError}
        aria-describedby={localError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        className={`
        w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        ${localError ? 'border-red-500' : 'border-gray-300'}
        `}
        required={required}
    />
    
    {localError && touched && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
        {localError}
        </p>
    )}
    
    {helperText && !localError && (
        <p id={`${id}-helper`} className="mt-1 text-sm text-gray-500">
        {helperText}
        </p>
    )}
    </div>
);
};

export default FormField;

