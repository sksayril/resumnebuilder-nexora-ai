import React, { useState, useRef, useEffect } from 'react';
import { EditableField as EditableFieldType } from '../types';
import { Pencil, Check, X } from 'lucide-react';

interface EditableFieldProps extends EditableFieldType {
  className?: string;
  placeholder?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  type,
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit...'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (type === 'text') {
        inputRef.current.select();
      }
    }
  }, [isEditing, type]);

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  const baseStyles = `
    w-full
    transition-all
    duration-200
    ease-in-out
    rounded-md
    outline-none
    focus:ring-2
    focus:ring-opacity-50
    focus:ring-blue-400
    focus:border-transparent
    placeholder-gray-400
    dark:placeholder-gray-500
  `;

  const textStyles = `
    ${baseStyles}
    px-3
    py-1.5
    text-sm
    leading-6
    border
    border-transparent
    hover:border-gray-200
    dark:hover:border-gray-700
    focus:bg-white
    dark:focus:bg-gray-800
    bg-transparent
  `;

  const textareaStyles = `
    ${baseStyles}
    px-3
    py-2
    text-sm
    leading-6
    border
    border-transparent
    hover:border-gray-200
    dark:hover:border-gray-700
    focus:bg-white
    dark:focus:bg-gray-800
    bg-transparent
    resize-none
    min-h-[100px]
  `;

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={`
          ${className}
          cursor-text
          transition-all
          duration-200
          ease-in-out
          hover:bg-gray-50
          dark:hover:bg-gray-800/50
          rounded-md
          px-3
          py-1.5
          -mx-3
          -my-1.5
        `}
      >
        {value || placeholder}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${textareaStyles} ${className}`}
        placeholder={placeholder}
        rows={4}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${textStyles} ${className}`}
      placeholder={placeholder}
    />
  );
};

export function EditableFieldOld({ type, value, onChange, className = '' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className={`group relative ${className}`}>
        {type === 'array' && Array.isArray(value) ? (
          <div className="flex flex-wrap gap-2">
            {(value as string[]).map((item, index) => (
              <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 rounded">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className={type === 'textarea' ? 'whitespace-pre-wrap' : ''}>
            {value as string}
          </div>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Pencil size={16} className="text-gray-600 hover:text-indigo-600" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {type === 'textarea' ? (
        <textarea
          value={tempValue as string}
          onChange={(e) => setTempValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          rows={4}
        />
      ) : type === 'array' ? (
        <input
          value={(tempValue as string[]).join(', ')}
          onChange={(e) => setTempValue(e.target.value.split(',').map(s => s.trim()))}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      ) : (
        <input
          value={tempValue as string}
          onChange={(e) => setTempValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      )}
      <div className="flex gap-2 justify-end">
        <button
          onClick={handleSave}
          className="p-1 text-green-600 hover:text-green-700"
        >
          <Check size={16} />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 text-red-600 hover:text-red-700"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}