import React from 'react';
import { Phone, Mail, MapPin, Building } from 'lucide-react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface MinimalistProProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
  onUpdate: (path: string[], value: string | string[]) => void;
}

export const MinimalistPro: React.FC<MinimalistProProps> = ({ resume, userPhoto, templateColor, onUpdate }) => {
  const { content } = resume;
  const { sections } = content;

  const handleChange = (path: string[], value: string | string[]) => {
    onUpdate(path, value);
  };

  // Circular Progress Component
  const CircularProgress = ({ percentage = 75, skill }: { percentage?: number; skill: string }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    
    return (
      <div className="flex items-center mb-6">
        <div className="relative w-16 h-16 mr-4">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 68 68">
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
        </div>
        <span className="text-gray-700 font-medium">{skill}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-gray-50 pt-8 pb-16">
        {/* Decorative Green Elements */}
        <div className="absolute top-0 right-0 w-96 h-64 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500 rounded-full opacity-10"></div>
          <div className="absolute top-8 right-8 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
          <div className="absolute top-16 right-32">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-12 bg-green-500 opacity-60 transform rotate-12"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute top-8 right-8 w-32 h-32 bg-white rounded-full p-1 shadow-lg z-10">
          <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Name and Title */}
        <div className="px-8 pt-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-widest uppercase">
            <EditableField
              type="text"
              value={sections.header.name}
              onChange={(value) => handleChange(['header', 'name'], value)}
              className="bg-transparent"
              as="span"
            />
          </h1>
          <p className="text-gray-600 text-lg tracking-wide uppercase mb-6">
            <EditableField
              type="text"
              value={sections.header.title}
              onChange={(value) => handleChange(['header', 'title'], value)}
              className="bg-transparent"
              as="span"
            />
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <EditableField
                type="text"
                value={sections.header.contact.phone}
                onChange={(value) => handleChange(['header', 'contact', 'phone'], value)}
                className="bg-transparent"
                as="span"
              />
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <EditableField
                type="text"
                value={sections.header.contact.email}
                onChange={(value) => handleChange(['header', 'contact', 'email'], value)}
                className="bg-transparent"
                as="span"
              />
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              <EditableField
                type="text"
                value={sections.header.contact.location}
                onChange={(value) => handleChange(['header', 'contact', 'location'], value)}
                className="bg-transparent"
                as="span"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-50 p-8">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="border-b border-gray-300 pb-2 mb-4">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                PROFILE
              </h2>
            </div>
            <div className="text-gray-600 text-sm leading-relaxed">
              <EditableField
                type="textarea"
                value={sections.summary}
                onChange={(value) => handleChange(['summary'], value)}
                className="bg-transparent"
                as="p"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                SKILLS
              </h2>
            </div>
            <div className="space-y-2">
              {sections.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">✓</span>
                  <EditableField
                    type="text"
                    value={skill}
                    onChange={(value) => handleChange(['skills', index.toString()], value)}
                    className="bg-transparent"
                    as="span"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-8">
          {/* Experience Section */}
          <div className="mb-8">
            <div className="border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                EXPERIENCE
              </h2>
            </div>
            {sections.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      <EditableField
                        type="text"
                        value={exp.title}
                        onChange={(value) => handleChange(['experience', index.toString(), 'title'], value)}
                        className="bg-transparent"
                        as="span"
                      />
                    </h3>
                    <p className="text-gray-600">
                      <EditableField
                        type="text"
                        value={exp.company}
                        onChange={(value) => handleChange(['experience', index.toString(), 'company'], value)}
                        className="bg-transparent"
                        as="span"
                      />
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    <EditableField
                      type="text"
                      value={exp.duration}
                      onChange={(value) => handleChange(['experience', index.toString(), 'duration'], value)}
                      className="bg-transparent"
                      as="span"
                    />
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {exp.achievements.map((achievement: string, achIndex: number) => (
                    <li key={achIndex}>
                      <EditableField
                        type="text"
                        value={achievement}
                        onChange={(value) => handleChange(['experience', index.toString(), 'achievements', achIndex.toString()], value)}
                        className="bg-transparent"
                        as="span"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};