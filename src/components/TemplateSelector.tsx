import React from 'react';
import { Template } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function TemplateSelector({ templates, selectedTemplate, onSelect, onBack, isLoading = false }: TemplateSelectorProps) {
  const handleTemplateSelect = (template: Template) => {
    if (!isLoading) {
      onSelect(template.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="group text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Form
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-indigo-900 dark:text-white sm:text-5xl">
            Choose Your Template
          </h1>
          <p className="mt-4 text-lg text-indigo-600 dark:text-indigo-300">
            Select a template that best represents your professional style
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              className="relative"
            >
              <Card className={`h-full overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-offset-4 shadow-xl' 
                  : 'hover:shadow-lg hover:ring-1 hover:ring-offset-2'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                style={{ 
                  borderColor: selectedTemplate === template.id ? template.color : undefined,
                  ringColor: selectedTemplate === template.id ? template.color : undefined
                }}
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" style={{ color: template.color }} />
                          ) : (
                            <Check className="w-6 h-6" style={{ color: template.color }} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-semibold mb-2" style={{ color: template.color }}>
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {template.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className={`w-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group
                      ${selectedTemplate === template.id 
                        ? 'hover:shadow-lg' 
                        : ''}
                    `}
                    onClick={() => {
                      handleTemplateSelect(template);
                    }}
                    disabled={isLoading}
                    style={{
                      backgroundColor: selectedTemplate === template.id ? template.color : '#f8fafc',
                      borderColor: template.color,
                      color: selectedTemplate === template.id ? 'white' : template.color,
                      boxShadow: selectedTemplate === template.id
                        ? `0 4px 14px 0 ${template.color}80`
                        : '0 0 0 0 transparent',
                      borderWidth: '1px',
                      transition: 'all 0.3s cubic-bezier(.4,2,.3,1)'
                    }}
                    onMouseEnter={e => {
                      if (selectedTemplate !== template.id) {
                        e.currentTarget.style.boxShadow = `0 0 16px 2px ${template.color}80`;
                      }
                    }}
                    onMouseLeave={e => {
                      if (selectedTemplate !== template.id) {
                        e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
                      }
                    }}
                    onFocus={e => {
                      if (selectedTemplate !== template.id) {
                        e.currentTarget.style.boxShadow = `0 0 16px 2px ${template.color}80`;
                      }
                    }}
                    onBlur={e => {
                      if (selectedTemplate !== template.id) {
                        e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
                      }
                    }}
                  >
                    {isLoading && selectedTemplate === template.id ? (
                      <div className="flex items-center justify-center w-full">
                        {/* Attractive Loader: Bouncing Dots with Glow */}
                        <span className="relative flex h-6 w-12 items-center justify-center">
                          <span style={{
                            boxShadow: `0 0 12px 2px ${template.color}80`,
                            backgroundColor: template.color
                          }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-bounce"
                            style={{ animationDelay: '0s', backgroundColor: template.color }}
                          ></span>
                          <span style={{
                            boxShadow: `0 0 12px 2px ${template.color}80`,
                            backgroundColor: template.color
                          }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-bounce"
                            style={{ animationDelay: '0.15s', backgroundColor: template.color }}
                          ></span>
                          <span style={{
                            boxShadow: `0 0 12px 2px ${template.color}80`,
                            backgroundColor: template.color
                          }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-bounce"
                            style={{ animationDelay: '0.3s', backgroundColor: template.color }}
                          ></span>
                        </span>
                        <span className="ml-3 animate-pulse font-semibold" style={{ color: template.color }}>Generating...</span>
                      </div>
                    ) : selectedTemplate === template.id ? (
                      <div className="flex items-center justify-center">
                        <Check className="w-4 h-4 mr-2" />
                        <span>Selected</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="font-semibold">Select Template</span>
                        <svg 
                          className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 text-center">
          <Button
            variant="ghost"
            onClick={onBack}
            className="group text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Form
          </Button>
        </div>
      </div>
    </div>
  );
}