import React, { useState } from 'react';
import { EditableField as EditableFieldType } from '../types';
import { Pencil, Check, X } from 'lucide-react';

interface EditableFieldProps extends EditableFieldType {
  className?: string;
}

export function EditableField({ type, value, onChange, className = '' }: EditableFieldProps) {
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