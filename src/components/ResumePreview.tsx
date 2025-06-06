import React, { useRef, useState } from 'react';
import { Download, ArrowLeft, AlertCircle } from 'lucide-react';
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
import {TechInnovator}  from "./templates/TechInnovator";
import { makePayment } from '../utils/razorpay';
import toast from 'react-hot-toast';

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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
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

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    try {
      // Create user data object for payment
      const paymentUserData = {
        name: content.sections.header.name,
        email: content.sections.header.contact.email,
        phone: content.sections.header.contact.phone
      };
      
      // Process payment (amount in INR)
      const paymentResponse = await makePayment(99, paymentUserData);
      
      // If payment successful, download PDF
      toast.success('Payment successful! Downloading your resume...');
      await generateAndDownloadPDF();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
    }
  };

  const generateAndDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };
  
  const downloadAsPDF = () => {
    setShowPaymentModal(true);
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
      return <MinimalistPro {...templateProps} />;
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
          
          <button
            onClick={downloadAsPDF}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-colors"
            style={{ backgroundColor: currentTemplate.color }}
            disabled={isProcessingPayment}
          >
            {isProcessingPayment ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF
              </>
            )}
          </button>
        </div>
        
        <div ref={resumeRef} className="transition-all duration-300 hover:shadow-xl">
          {renderTemplate()}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium Resume Download</h3>
                <p className="text-gray-600">Get your professionally designed resume for just ₹99</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                <p className="text-sm text-blue-700">
                  Your payment is processed securely through RazorPay. After successful payment, your resume will download automatically.
                </p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">Premium Resume</span>
                  <span className="font-bold">₹99</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="font-medium">Template: {currentTemplate.name}</span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-2 px-4 rounded-md text-white transition-colors flex items-center justify-center"
                  style={{ backgroundColor: currentTemplate.color }}
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Pay ₹99'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}