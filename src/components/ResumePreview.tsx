import React, { useRef, useState } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GeneratedResume, Template } from '../types';
import { EditableField } from './EditableField';

interface ResumePreviewProps {
  resume: GeneratedResume;
  userPhoto?: string;
  onBack: () => void;
  templates: Template[];
}

export function ResumePreview({ resume: initialResume, userPhoto, onBack, templates }: ResumePreviewProps) {
  const [resume, setResume] = useState(initialResume);
  const { content, template } = resume;
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const currentTemplate = templates.find(t => t.id === template) || templates[0];

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

  const downloadAsPDF = async () => {
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
    }
  };

  const renderModernTemplate = () => (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <div className="flex items-center gap-8 mb-8 border-b pb-8" style={{ borderColor: currentTemplate.color }}>
        {userPhoto && (
          <img
            src={userPhoto}
            alt={content.sections.header.name}
            className="w-32 h-32 rounded-full object-cover ring-4 ring-offset-4"
            style={{ ringColor: currentTemplate.color }}
          />
        )}
        <div>
          <EditableField
            type="text"
            value={content.sections.header.name}
            onChange={(value) => updateResumeField(['sections', 'header', 'name'], value as string)}
            className="text-4xl font-bold"
            style={{ color: currentTemplate.color }}
          />
          <EditableField
            type="text"
            value={content.sections.header.title}
            onChange={(value) => updateResumeField(['sections', 'header', 'title'], value as string)}
            className="text-xl mt-2"
          />
          <div className="mt-4 flex gap-4 text-gray-600">
            <EditableField
              type="text"
              value={content.sections.header.contact.email}
              onChange={(value) => updateResumeField(['sections', 'header', 'contact', 'email'], value as string)}
            />
            <span>•</span>
            <EditableField
              type="text"
              value={content.sections.header.contact.phone}
              onChange={(value) => updateResumeField(['sections', 'header', 'contact', 'phone'], value as string)}
            />
            <span>•</span>
            <EditableField
              type="text"
              value={content.sections.header.contact.location}
              onChange={(value) => updateResumeField(['sections', 'header', 'contact', 'location'], value as string)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2" style={{ borderColor: currentTemplate.color }}>
              Professional Summary
            </h2>
            <EditableField
              type="textarea"
              value={content.sections.summary}
              onChange={(value) => updateResumeField(['sections', 'summary'], value as string)}
              className="text-gray-700"
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2" style={{ borderColor: currentTemplate.color }}>
              Experience
            </h2>
            <div className="space-y-6">
              {content.sections.experience.map((exp, index) => (
                <div key={index} className="relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5" style={{ 
                  ['--tw-before-bg' as string]: currentTemplate.color,
                }}>
                  <EditableField
                    type="text"
                    value={exp.title}
                    onChange={(value) => updateResumeField(['sections', 'experience', index, 'title'], value as string)}
                    className="text-xl font-semibold"
                    style={{ color: currentTemplate.color }}
                  />
                  <EditableField
                    type="text"
                    value={exp.company}
                    onChange={(value) => updateResumeField(['sections', 'experience', index, 'company'], value as string)}
                    className="text-lg"
                  />
                  <EditableField
                    type="text"
                    value={exp.duration}
                    onChange={(value) => updateResumeField(['sections', 'experience', index, 'duration'], value as string)}
                    className="text-gray-600 mb-2"
                  />
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>
                        <EditableField
                          type="text"
                          value={achievement}
                          onChange={(value) => {
                            const newAchievements = [...exp.achievements];
                            newAchievements[i] = value as string;
                            updateResumeField(['sections', 'experience', index, 'achievements'], newAchievements);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2" style={{ borderColor: currentTemplate.color }}>
              Projects
            </h2>
            <div className="space-y-6">
              {content.sections.projects?.map((project, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <EditableField
                    type="text"
                    value={project.name}
                    onChange={(value) => updateResumeField(['sections', 'projects', index, 'name'], value as string)}
                    className="text-lg font-semibold"
                    style={{ color: currentTemplate.color }}
                  />
                  <EditableField
                    type="textarea"
                    value={project.description}
                    onChange={(value) => updateResumeField(['sections', 'projects', index, 'description'], value as string)}
                    className="text-gray-700 mt-2"
                  />
                  <EditableField
                    type="array"
                    value={project.technologies}
                    onChange={(value) => updateResumeField(['sections', 'projects', index, 'technologies'], value as string[])}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b-2" style={{ borderColor: currentTemplate.color }}>
              Skills
            </h2>
            <EditableField
              type="array"
              value={content.sections.skills}
              onChange={(value) => updateResumeField(['sections', 'skills'], value as string[])}
              className="flex flex-wrap gap-2"
            />
          </section>
        </div>
      </div>
    </div>
  );

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
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
        
        <div 
          ref={resumeRef}
          className="transition-all duration-300 hover:shadow-xl"
        >
          {renderModernTemplate()}
        </div>
      </div>
    </div>
  );
}