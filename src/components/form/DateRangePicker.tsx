import React, { useState, useEffect } from 'react';

interface DateRange {
startDate: string;
endDate: string;
current: boolean;
}

interface DateRangePickerProps {
label: string;
name: string;
value: DateRange;
onChange: (name: string, value: DateRange) => void;
required?: boolean;
error?: string;
disabled?: boolean;
helperText?: string;
className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
label,
name,
value,
onChange,
required = false,
error,
disabled = false,
helperText,
className = '',
}) => {
const [localValue, setLocalValue] = useState<DateRange>(value);
const [localError, setLocalError] = useState<string | undefined>(error);
const [touched, setTouched] = useState(false);

useEffect(() => {
    setLocalValue(value);
}, [value]);

useEffect(() => {
    setLocalError(error);
}, [error]);

const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...localValue, startDate: e.target.value };
    setLocalValue(newValue);
    onChange(name, newValue);
};

const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...localValue, endDate: e.target.value };
    setLocalValue(newValue);
    onChange(name, newValue);
};

const handleCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { ...localValue, current: e.target.checked, endDate: e.target.checked ? '' : localValue.endDate };
    setLocalValue(newValue);
    onChange(name, newValue);
};

const validate = () => {
    setTouched(true);
    
    if (required && !localValue.startDate) {
    setLocalError('Start date is required');
    return false;
    }
    
    if (!localValue.current && required && !localValue.endDate) {
    setLocalError('End date is required when not current');
    return false;
    }
    
    if (localValue.startDate && localValue.endDate && new Date(localValue.startDate) > new Date(localValue.endDate)) {
    setLocalError('Start date cannot be after end date');
    return false;
    }
    
    setLocalError(undefined);
    return true;
};

const handleBlur = () => {
    validate();
};

const startId = `${name}-start-date`;
const endId = `${name}-end-date`;
const currentId = `${name}-current`;

return (
    <div className={`mb-4 ${className}`}>
    <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor={startId} className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
            </label>
            <input
            type="date"
            id={startId}
            name={`${name}-start`}
            value={localValue.startDate}
            onChange={handleStartDateChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={`
                w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                ${localError ? 'border-red-500' : 'border-gray-300'}
            `}
            required={required}
            aria-describedby={localError ? `${name}-error` : undefined}
            />
        </div>
        
        <div>
            <label htmlFor={endId} className="block text-sm font-medium text-gray-700 mb-1">
            End Date
            </label>
            <input
            type="date"
            id={endId}
            name={`${name}-end`}
            value={localValue.endDate}
            onChange={handleEndDateChange}
            onBlur={handleBlur}
            disabled={disabled || localValue.current}
            className={`
                w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${(disabled || localValue.current) ? 'bg-gray-100 cursor-not-allowed' : ''}
                ${localError ? 'border-red-500' : 'border-gray-300'}
            `}
            required={required && !localValue.current}
            aria-describedby={localError ? `${name}-error` : undefined}
            />
        </div>
        </div>
        
        <div className="mt-2">
        <div className="flex items-center">
            <input
            type="checkbox"
            id={currentId}
            name={`${name}-current`}
            checked={localValue.current}
            onChange={handleCurrentChange}
            disabled={disabled}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={currentId} className="ml-2 block text-sm text-gray-700">
            I currently work here
            </label>
        </div>
        </div>
        
        {localError && touched && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600" role="alert">
            {localError}
        </p>
        )}
        
        {helperText && !localError && (
        <p id={`${name}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
        </p>
        )}
    </fieldset>
    </div>
);
};

export default DateRangePicker;

