import React, { useRef, useState, useEffect } from 'react';
import { Download, ArrowLeft, AlertCircle, User } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GeneratedResume, Template } from '../types';
import { EditableField } from './EditableField';
import { CreativePortfolio } from './templates/CreativePortfolio';
import { CorporateClassic } from './templates/CorporateClassic';
import { ElegantHR } from './templates/ElegantHR';
import { MinimalistModern } from './templates/MinimalistModern';
import { MinimalistPro } from './templates/MinimalistPro';
import { ModernElegant } from './templates/ModernElegant';
import { TechInnovator } from "./templates/TechInnovator";
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginDialog } from './ui/LoginDialog';
import { SubscriptionDialog } from './ui/SubscriptionDialog';
import { UserProfileDialog } from './ui/UserProfileDialog';

interface ResumePreviewProps {
  resume: GeneratedResume;
  userPhoto?: string;
  onBack: () => void;
  templates: Template[];
}

interface TemplateProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

export function ResumePreview({ resume: initialResume, userPhoto, onBack, templates }: ResumePreviewProps) {
  const [resume, setResume] = useState(initialResume);
  const { content, template } = resume;
  const resumeRef = useRef<HTMLDivElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userData, setUserData] = useState<{
    email: string;
    isPremium: boolean;
    daysUntilExpiry: number;
  } | null>(null);
  
  const currentTemplate = templates.find(t => t.id.toLowerCase() === template?.toLowerCase()) || templates[0];

  const updateResumeField = (path: string[], value: string | string[]) => {
    setResume(prev => {
      const newResume = JSON.parse(JSON.stringify(prev));
      let current: any = newResume.content;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newResume;
    });
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('https://7cvccltb-3300.inc1.devtunnels.ms/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setUserData({
        email: data.email,
        isPremium: data.isPremium,
        daysUntilExpiry: data.daysUntilExpiry || 0,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const downloadAsPDF = async () => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setIsDownloading(true);
    try {
      // Check premium status
      const response = await fetch('https://7cvccltb-3300.inc1.devtunnels.ms/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      if (data.email) {
        localStorage.setItem('userEmail', data.email);
      }

      if (!data.isPremium) {
        setShowSubscriptionDialog(true);
        setIsDownloading(false);
        return;
      }

      // If premium, proceed with PDF generation
      if (!resumeRef.current) {
        throw new Error('Resume content not found');
      }

      // Create a clone of the resume content for PDF generation
      const resumeElement = resumeRef.current.cloneNode(true) as HTMLElement;
      document.body.appendChild(resumeElement);
      resumeElement.style.position = 'absolute';
      resumeElement.style.left = '-9999px';
      resumeElement.style.width = '210mm'; // A4 width
      resumeElement.style.height = '297mm'; // A4 height

      // Generate PDF
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Save the PDF
      pdf.save('resume.pdf');
      toast.success('Resume downloaded successfully!');

      // Cleanup
      document.body.removeChild(resumeElement);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderTemplate = () => {
    const templateProps = {
      resume,
      userPhoto,
      templateColor: currentTemplate.color
    };


    // Convert template ID to lowercase for case-insensitive comparison
    const templateId = template?.toLowerCase();

    switch (templateId) {
      case 'corporateclassic':
        return <CorporateClassic {...templateProps} />;
      case 'creativeportfolio':
       return <CreativePortfolio {...templateProps} />;
       case 'eleganthr':
        return <ElegantHR {...templateProps} />;
      case 'minimalistmodern':
        return <MinimalistModern {...templateProps} />;
      case 'minimalistpro':
        // MinimalistPro does not accept props
        return <MinimalistPro />;
      case 'modernelegant':
        return <ModernElegant {...templateProps} />;
        case 'techinnovator':
          return <TechInnovator {...templateProps} />;
    }
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Templates
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={downloadAsPDF}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors ${
                isDownloading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ backgroundColor: currentTemplate.color }}
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download PDF
                </>
              )}
            </button>

            <button
              onClick={() => setShowUserProfile(true)}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
       
        
        <div ref={resumeRef} className="transition-all duration-300 hover:shadow-xl">
          {renderTemplate() || null}
        </div>

        {/* Login Modal */}
        <LoginDialog
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
          onLogin={() => { setShowLoginModal(false); }}
        />

        {/* Subscription Dialog */}
        <SubscriptionDialog
          open={showSubscriptionDialog}
          onOpenChange={setShowSubscriptionDialog}
        />

        {/* User Profile Dialog */}
        <UserProfileDialog
          open={showUserProfile}
          onOpenChange={setShowUserProfile}
          userData={userData}
        />
      </div>
    </div>
  );
}