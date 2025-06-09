import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ResumeForm } from "./components/ResumeForm";
import { TemplateSelector } from './components/TemplateSelector';
import { ResumePreview } from './components/ResumePreview';
import { generateResume } from './services/ai';
import { UserData, GeneratedResume, Template } from './types';
import { useAuth } from './context/AuthContext';
import template1 from '/template1.jpg';
import template2 from '/template2.jpg';
import template3 from '/template3.jpg';
import toast from 'react-hot-toast';
import { CorporateClassic } from './components/templates/CorporateClassic';
import { TechInnovator } from './components/templates/TechInnovator';
import { CreativePortfolio } from './components/templates/CreativePortfolio';
import { MinimalistModern } from './components/templates/MinimalistModern';

const templates: Template[] = [
  {
    id: 'modernelegant',
    name: 'Modern Elegance',
    preview: template1,
    color: '#4F46E5',
    description: 'Clean and contemporary design with a focus on visual hierarchy and readability.'
  },
  {
    id: 'corporateclassic',
    name: 'Corporate Classic',
    preview: template2,
    color: '#2563EB',
    description: 'Professional and traditional layout with clean typography and balanced spacing.'
  },
  {
    id: 'creativeportfolio',
    name: 'Creative Portfolio',
    preview: template3,
    color: '#8B5CF6',
    description: 'Creative and artistic design with unique layout and visual flair.'
  },
  {
    id: 'minimalistpro',
    name: 'Minimalist Pro',
    preview: template1,
    color: '#10B981',
    description: 'Sleek and modern design with asymmetric layout and creative typography.'
  },
  {
    id: 'minimalistmodern',
    name: 'Minimalist Modern',
    preview: template2,
    color: '#1F2937',
    description: 'Clean and minimal design with focus on typography and whitespace.'
  },
  {
    id: 'eleganthr',
    name: 'Elegant HR',
    preview: template3,
    color: '#FFD166',
    description: 'A professional HR template with a modern, clean layout and strong section highlights.'
  },
  {
    id: 'techinnovator',
    name: 'Tech Innovator',
    preview: template2,
    color: '#10B981',
    description: 'Modern tech-focused design with dynamic layout and innovative visual elements.'
  }
];

// Main App Content
function AppContent() {
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [step, setStep] = useState<'landing' | 'form' | 'template' | 'preview'>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    // Check if we're coming from the resume form
    if (location.pathname === '/' && location.search.includes('step=template')) {
      setStep('template');
      setShowResumeBuilder(true);
    }
  }, [location]);

  const handleGetStartedClick = () => {
    navigate('/resumeform');
  };

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data);
    if (data.photo) {
      setUserPhoto(URL.createObjectURL(data.photo));
    }
    setStep('template');
  };

  const handleTemplateSelect = async (templateId: string) => {
    if (!userData) {
      toast.error('Please fill in your information first');
      return;
    }

    try {
      setIsLoading(true);
      
      // Find the template object
      const selectedTemplate = templates.find(t => t.id.toLowerCase() === templateId.toLowerCase());
      if (!selectedTemplate) {
        throw new Error('Template not found');
      }
      
      const generatedResume = await generateResume(userData, selectedTemplate.id);
      
      setGeneratedResume(generatedResume);
      setSelectedTemplate(selectedTemplate.id);
      setStep('preview');
    } catch (error) {
      toast.error('Failed to generate resume. Please try again.');
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Routes>
        <Route path="/resumeform" element={
          <ResumeForm 
            onSubmit={(data) => {
              setUserData(data);
              if (data.photo) {
                setUserPhoto(URL.createObjectURL(data.photo));
              }
              navigate('/?step=template');
            }} 
            onBack={() => {
              navigate('/');
            }} 
          />
        } />
        <Route
          path="/"
          element={
            showResumeBuilder ? (
              <div>
                {step === 'form' && <ResumeForm onSubmit={handleFormSubmit} onBack={handleBack} />}
                {step === 'template' && (
                  <div className="relative">
                    {isLoading && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                          <p className="text-gray-700">Generating your resume...</p>
                        </div>
                      </div>
                    )}
                    <TemplateSelector
                      templates={templates}
                      selectedTemplate={selectedTemplate}
                      onSelect={handleTemplateSelect}
                      onBack={() => setStep('form')}
                      isLoading={isLoading}
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
            ) : (
              <LandingPage onGetStarted={handleGetStartedClick} />
            )
          }
        />
      </Routes>
    </div>
  );
}

// Root App component with providers
function App() {
  return (
    <Router>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;