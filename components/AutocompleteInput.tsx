"use client";

import React, { useState, useRef, useEffect } from 'react';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  minChars?: number;
  disabled?: boolean;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  options,
  placeholder = '',
  required = false,
  className = '',
  minChars = 2,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length >= minChars) {
      const query = value.toLowerCase();
      const matches = options.filter(opt =>
        opt.toLowerCase().includes(query)
      ).slice(0, 15); // Limit to 15 suggestions for performance
      setFilteredOptions(matches);
    } else {
      setFilteredOptions([]);
      setIsOpen(false);
    }
  }, [value, options, minChars]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (value.length >= minChars && filteredOptions.length > 0) {
            setIsOpen(true);
          }
        }}
        placeholder={placeholder}
        required={required}
        className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
        autoComplete="off"
        disabled={disabled}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-[#d6c9e8] rounded-2xl shadow-xl max-h-48 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full text-right px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#FEE4ED] hover:text-[#c9beda] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
