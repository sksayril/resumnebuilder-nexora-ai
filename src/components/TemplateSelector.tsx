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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="group"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Form
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Choose Your Template
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
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
              <Card className={`h-full overflow-hidden transition-all duration-300 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-offset-2' 
                  : 'hover:shadow-lg'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                style={{ 
                  borderColor: selectedTemplate === template.id ? template.color : undefined
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
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
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
                    className="w-full"
                    onClick={() => !isLoading && onSelect(template.id)}
                    disabled={isLoading}
                    style={{
                      backgroundColor: selectedTemplate === template.id ? template.color : undefined,
                      borderColor: template.color,
                      color: selectedTemplate === template.id ? 'white' : template.color
                    }}
                  >
                    {isLoading && selectedTemplate === template.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : selectedTemplate === template.id ? (
                      'Selected'
                    ) : (
                      'Select Template'
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
            className="group"
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