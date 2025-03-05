import React, { useState, useEffect, KeyboardEvent } from 'react';

interface SkillsInputProps {
label: string;
name: string;
value: string[];
onChange: (name: string, value: string[]) => void;
required?: boolean;
error?: string;
disabled?: boolean;
placeholder?: string;
maxSkills?: number;
helperText?: string;
className?: string;
suggestions?: string[];
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
label,
name,
value,
onChange,
required = false,
error,
disabled = false,
placeholder = 'Add a skill',
maxSkills,
helperText,
className,
suggestions = [],
}) => {
const [inputValue, setInputValue] = useState<string>('');
const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
const inputRef = React.useRef<HTMLInputElement>(null);

// Filter suggestions based on input value
useEffect(() => {
    if (inputValue.trim() === '') {
    setFilteredSuggestions([]);
    return;
    }
    
    const filtered = suggestions.filter(
    (suggestion) => 
        suggestion.toLowerCase().includes(inputValue.toLowerCase()) && 
        !value.includes(suggestion)
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
}, [inputValue, suggestions, value]);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
};

const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (!trimmedSkill) return;
    
    // Check if skill already exists
    if (value.includes(trimmedSkill)) {
    return;
    }
    
    // Check if max skills limit is reached
    if (maxSkills && value.length >= maxSkills) {
    return;
    }
    
    onChange(name, [...value, trimmedSkill]);
    setInputValue('');
    setShowSuggestions(false);
};

const removeSkill = (index: number) => {
    const newSkills = [...value];
    newSkills.splice(index, 1);
    onChange(name, newSkills);
};

const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
    e.preventDefault();
    addSkill(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
    removeSkill(value.length - 1);
    }
};

const handleSuggestionClick = (suggestion: string) => {
    addSkill(suggestion);
    inputRef.current?.focus();
};

return (
    <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    
    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {value.map((skill, index) => (
        <div 
            key={index} 
            className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
        >
            <span>{skill}</span>
            <button
            type="button"
            onClick={() => removeSkill(index)}
            className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
            disabled={disabled}
            >
            &times;
            </button>
        </div>
        ))}
        
        <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-grow outline-none min-w-[120px] border-none p-1"
        disabled={disabled || (maxSkills !== undefined && value.length >= maxSkills)}
        />
    </div>
    
    {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="mt-1 border rounded-md shadow-lg bg-white max-h-[200px] overflow-y-auto">
        {filteredSuggestions.map((suggestion, index) => (
            <div
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSuggestionClick(suggestion)}
            >
            {suggestion}
            </div>
        ))}
        </div>
    )}
    
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    {maxSkills && (
        <p className="mt-1 text-sm text-gray-500">
        {value.length}/{maxSkills} skills
        </p>
    )}
    </div>
);
};
