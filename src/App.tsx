import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ResumeForm } from './components/ResumeForm';
import { TemplateSelector } from './components/TemplateSelector';
import { ResumePreview } from './components/ResumePreview';
import { generateResume } from './services/ai';
import { UserData, GeneratedResume, Template } from './types';
import resumetemplate1 from '/template1.jpg';
import resumetemplate2 from '/template2.jpg';
import resumetemplate3 from '/template3.jpg';
import toast from 'react-hot-toast';

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Elegance',
    preview: resumetemplate1,
    color: '#4F46E5',
    description: 'Clean and contemporary design with a focus on visual hierarchy and readability.'
  },
  {
    id: 'professional',
    name: 'Executive Pro',
    preview: resumetemplate2,
    color: '#0EA5E9',
    description: 'Traditional yet sophisticated layout perfect for corporate and executive roles.'
  },
  {
    id: 'creative',
    name: 'Creative Impact',
    preview: resumetemplate3,
    color: '#EC4899',
    description: 'Bold and innovative design that helps creative professionals stand out.'
  },
  // {
  //   id: 'minimal',
  //   name: 'Minimal Focus',
  //   preview: 'https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80',
  //   color: '#10B981',
  //   description: 'Minimalist approach that puts your content front and center.'
  // },
  // {
  //   id: 'tech',
  //   name: 'Tech Innovator',
  //   preview: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&q=80',
  //   color: '#6366F1',
  //   description: 'Modern tech-focused design perfect for IT and software roles.'
  // },
  // {
  //   id: 'startup',
  //   name: 'Startup Edge',
  //   preview: 'https://images.unsplash.com/photo-1624571409108-e9d886450b45?w=500&q=80',
  //   color: '#F43F5E',
  //   description: 'Dynamic and energetic layout ideal for startup and scale-up environments.'
  // }
];

function App() {
  const [step, setStep] = useState<'landing' | 'form' | 'template' | 'preview'>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setStep('form');
  };

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data);
    if (data.photo) {
      setUserPhoto(URL.createObjectURL(data.photo));
    }
    setStep('template');
  };

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    if (userData) {
      setIsLoading(true);
      try {
        const resume = await generateResume(userData, templateId);
        setGeneratedResume(resume);
        setStep('preview');
      } catch (error: any) {
        toast.error(error.message || 'Failed to generate resume. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    switch (step) {
      case 'form':
        setStep('landing');
        break;
      case 'template':
        setStep('form');
        break;
      case 'preview':
        setStep('template');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {step === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      
      {step === 'form' && <ResumeForm onSubmit={handleFormSubmit} onBack={handleBack} />}
      
      {step === 'template' && (
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-700">Generating your resume...</p>
              </div>
              <h1>now</h1>
            </div>
            
          )}
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelect={handleTemplateSelect}
            onBack={handleBack}
          />
        </div>
      )}
      
      {step === 'preview' && generatedResume && (
        <ResumePreview 
          resume={generatedResume} 
          userPhoto={userPhoto} 
          onBack={handleBack}
          templates={templates}
        />
      )}
    </div>
  );
}

export default App;