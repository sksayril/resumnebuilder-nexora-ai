import React from 'react';
import { Template } from '../types';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  onBack: () => void;
}

export function TemplateSelector({ templates, selectedTemplate, onSelect, onBack }: TemplateSelectorProps) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Form
        </button>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          Choose Your Perfect Template
        </h2>
        <p className="text-gray-600 text-lg">
          Select a design that best represents your professional identity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
              selectedTemplate === template.id
                ? 'ring-4 ring-offset-4 shadow-2xl scale-102'
                : 'hover:shadow-xl'
            }`}
            style={{ 
              ['--tw-ring-color' as string]: template.color,
              ['--tw-ring-offset-color' as string]: '#ffffff'
            }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(to bottom, transparent, ${template.color}dd)`
                }}
              />
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-lg">
                  <CheckCircle2 className="w-6 h-6" style={{ color: template.color }} />
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-transparent bg-clip-text transition-colors duration-300"
                style={{ 
                  backgroundImage: `linear-gradient(to right, ${template.color}, ${template.color}bb)`
                }}
              >
                {template.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {template.description}
              </p>
              <div 
                className="h-1 w-12 rounded-full transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: template.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}