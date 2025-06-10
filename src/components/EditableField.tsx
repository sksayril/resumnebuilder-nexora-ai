import React, { useState, useRef, useEffect } from 'react';
import { EditableField as EditableFieldType } from '../types';
import { Pencil, Check, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditableFieldProps extends EditableFieldType {
  className?: string;
  placeholder?: string;
  as?: 'div' | 'span' | 'p';
  label?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  type,
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit...',
  as = 'div',
  label
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setLocalValue(value);
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const baseStyles = "w-full outline-none focus:outline-none focus:ring-0 transition-all duration-200";
  const textStyles = "bg-transparent border-b-2 border-transparent hover:border-indigo-300 focus:border-indigo-500 px-1 py-0.5 rounded-t";
  const textareaStyles = "bg-transparent border-2 border-transparent hover:border-indigo-300 focus:border-indigo-500 rounded-lg p-2 resize-none min-h-[100px]";

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="relative"
      >
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        {type === 'textarea' ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${baseStyles} ${textareaStyles} ${className} shadow-sm`}
            rows={3}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${baseStyles} ${textStyles} ${className}`}
            placeholder={placeholder}
          />
        )}
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBlur}
            className="p-1 text-green-600 hover:text-green-700 bg-white rounded-full shadow-sm"
          >
            <Check size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setLocalValue(value);
              setIsEditing(false);
            }}
            className="p-1 text-red-600 hover:text-red-700 bg-white rounded-full shadow-sm"
          >
            <X size={16} />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const Element = as;
  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <Element
        onClick={() => setIsEditing(true)}
        className={`cursor-text transition-all duration-200 ${className} ${
          isHovered ? 'text-indigo-600' : ''
        }`}
      >
        {value || (
          <span className="text-gray-400 italic">{placeholder}</span>
        )}
      </Element>
      <AnimatePresence>
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsEditing(true)}
            className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Pencil size={14} className="text-indigo-600" />
          </motion.button>
        )}
      </AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-6 left-0 text-xs text-gray-500"
        >
          Click to edit
        </motion.div>
      )}
    </motion.div>
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