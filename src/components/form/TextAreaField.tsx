import React, { useState, useEffect, ChangeEvent } from 'react';

interface TextAreaFieldProps {
label: string;
name: string;
placeholder?: string;
value: string;
onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
required?: boolean;
error?: string;
disabled?: boolean;
rows?: number;
maxLength?: number;
helperText?: string;
className?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
label,
name,
placeholder = '',
value,
onChange,
required = false,
error,
disabled = false,
rows = 4,
maxLength,
helperText,
className = '',
}) => {
const [isFocused, setIsFocused] = useState(false);
const [touched, setTouched] = useState(false);
const [localError, setLocalError] = useState<string | undefined>(error);
const [charCount, setCharCount] = useState(value.length);

useEffect(() => {
    setLocalError(error);
}, [error]);

useEffect(() => {
    setCharCount(value.length);
}, [value]);

const handleBlur = () => {
    setIsFocused(false);
    setTouched(true);
    
    if (required && !value.trim()) {
    setLocalError(`${label} is required`);
    } else if (maxLength && value.length > maxLength) {
    setLocalError(`${label} exceeds maximum length of ${maxLength} characters`);
    }
};

const handleFocus = () => {
    setIsFocused(true);
};

const id = `textarea-${name}`;

return (
    <div className={`mb-4 ${className}`}>
    <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
    >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    
    <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => {
        onChange(e);
        setCharCount(e.target.value.length);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={!!localError}
        aria-describedby={
        localError ? `${id}-error` : 
        maxLength ? `${id}-counter` : 
        helperText ? `${id}-helper` : undefined
        }
        className={`
        w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        ${localError ? 'border-red-500' : 'border-gray-300'}
        `}
        required={required}
    />
    
    <div className="flex justify-between mt-1">
        {localError && touched ? (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
            {localError}
        </p>
        ) : helperText ? (
        <p id={`${id}-helper`} className="text-sm text-gray-500">
            {helperText}
        </p>
        ) : (
        <span></span>
        )}
        
        {maxLength && (
        <p id={`${id}-counter`} className={`text-sm ${charCount > maxLength ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxLength}
        </p>
        )}
    </div>
    </div>
);
};

export default TextAreaField;

