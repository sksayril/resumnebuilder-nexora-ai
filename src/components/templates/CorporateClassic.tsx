import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';
import { Phone, MapPin, Mail, User } from 'lucide-react';

interface CorporateClassicProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
  onUpdate: (path: string[], value: string | string[]) => void;
}

export const CorporateClassic: React.FC<CorporateClassicProps> = ({ 
  resume, 
  userPhoto, 
  templateColor,
  onUpdate 
}) => {
  const { content } = resume;
  const { sections } = content;

  const handleChange = (path: string[], value: string | string[]) => {
    onUpdate(path, value);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-orange-500"></div>
      <div className="absolute top-4 left-12 w-6 h-6 bg-black"></div>
      <div className="absolute top-8 right-20 w-4 h-4 bg-gray-300"></div>
      
      <div className="grid grid-cols-12 min-h-screen">
        {/* Left Side - Light Background */}
        <div className="col-span-5 bg-gray-50 p-8 relative">
          {/* Header */}
          <div className="bg-black text-white p-6 mb-8 relative z-10">
            <h1 className="text-4xl font-bold mb-2">Hello I'm</h1>
            <h2 className="text-4xl font-bold mb-4">
              <EditableField
                type="text"
                value={sections.header.name}
                onChange={(value) => handleChange(['header', 'name'], value)}
                className="bg-transparent text-white"
                as="span"
              />
            </h2>
            <div className="text-xl font-light uppercase tracking-wide">
              <EditableField
                type="text"
                value={sections.header.title}
                onChange={(value) => handleChange(['header', 'title'], value)}
                className="bg-transparent text-white"
                as="span"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Contact Me:</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <EditableField
                  type="text"
                  value={sections.header.contact.phone}
                  onChange={(value) => handleChange(['header', 'contact', 'phone'], value)}
                  className="bg-transparent"
                  as="span"
                />
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <EditableField
                  type="text"
                  value={sections.header.contact.location}
                  onChange={(value) => handleChange(['header', 'contact', 'location'], value)}
                  className="bg-transparent"
                  as="span"
                />
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <EditableField
                  type="text"
                  value={sections.header.contact.email}
                  onChange={(value) => handleChange(['header', 'contact', 'email'], value)}
                  className="bg-transparent"
                  as="span"
                />
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">About Me</h3>
            <div className="text-gray-700 leading-relaxed text-sm">
              <EditableField
                type="textarea"
                value={sections.summary}
                onChange={(value) => handleChange(['summary'], value)}
                className="bg-transparent"
                as="p"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">Skills</h3>
            <div className="space-y-4">
              {sections.skills.map((skill: string, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 uppercase">
                      <EditableField
                        type="text"
                        value={skill}
                        onChange={(value) => handleChange(['skills', index.toString()], value)}
                        className="bg-transparent"
                        as="span"
                      />
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 relative">
                    <div className="bg-black h-2 w-4/5 relative">
                      <div className="absolute right-0 top-0 w-3 h-3 bg-black rounded-full transform translate-x-1 -translate-y-0.5"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-8">
            <div className="w-20 h-20 bg-black mb-2 grid grid-cols-4 gap-1 p-2">
              {[...Array(16)].map((_, i) => (
                <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`}></div>
              ))}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex space-x-1">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
              <span>follow me: @{sections.header.name.toLowerCase()}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Image and Dark Sections */}
        <div className="col-span-7 relative">
          {/* Main Image Area */}
          <div className="h-96 bg-gradient-to-br from-yellow-200 to-yellow-400 relative flex items-center justify-center">
            <div className="w-64 h-64 bg-gray-300 rounded-full flex items-center justify-center">
              {userPhoto ? (
                <img src={userPhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={120} className="text-gray-500" />
              )}
            </div>
            
            {/* The best photographs badge */}
            <div className="absolute bottom-4 right-4 bg-black text-white p-4 text-center">
              <p className="text-sm font-bold">The best</p>
              <p className="text-sm font-bold">photographs</p>
              <p className="text-xs mt-1">AT THE PERFECT TIME</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-black text-white">
            <div className="flex">
              <div className="w-32 bg-gray-800 flex items-center justify-center">
                <div className="transform -rotate-90 whitespace-nowrap">
                  <h3 className="text-lg font-bold tracking-widest">EXPERIENCE</h3>
                </div>
              </div>
              <div className="flex-1 p-6 space-y-6">
                {sections.experience.map((exp: any, index: number) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          <EditableField
                            type="text"
                            value={exp.title}
                            onChange={(value) => handleChange(['experience', index.toString(), 'title'], value)}
                            className="bg-transparent text-white"
                            as="span"
                          />
                        </h4>
                        <div className="text-sm text-gray-300">
                          <EditableField
                            type="text"
                            value={exp.company}
                            onChange={(value) => handleChange(['experience', index.toString(), 'company'], value)}
                            className="bg-transparent text-gray-300"
                            as="span"
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        <EditableField
                          type="text"
                          value={exp.duration}
                          onChange={(value) => handleChange(['experience', index.toString(), 'duration'], value)}
                          className="bg-transparent text-gray-400"
                          as="span"
                        />
                      </span>
                    </div>
                    <div className="space-y-1">
                      {exp.achievements.map((achievement: string, achIndex: number) => (
                        <div key={achIndex} className="text-sm text-gray-300 leading-relaxed">
                          <EditableField
                            type="text"
                            value={achievement}
                            onChange={(value) => handleChange(['experience', index.toString(), 'achievements', achIndex.toString()], value)}
                            className="bg-transparent"
                            as="span"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Section (styled as Education) */}
          <div className="bg-black text-white">
            <div className="flex">
              <div className="w-32 bg-gray-900 flex items-center justify-center">
                <div className="transform -rotate-90 whitespace-nowrap">
                  <h3 className="text-lg font-bold tracking-widest">PROJECTS</h3>
                </div>
              </div>
              <div className="flex-1 p-6 space-y-6">
                {sections.projects.map((project: any, index: number) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          <EditableField
                            type="text"
                            value={project.name}
                            onChange={(value) => handleChange(['projects', index.toString(), 'name'], value)}
                            className="bg-transparent text-white"
                            as="span"
                          />
                        </h4>
                        <div className="text-sm text-gray-300">
                          <EditableField
                            type="text"
                            value={project.description}
                            onChange={(value) => handleChange(['projects', index.toString(), 'description'], value)}
                            className="bg-transparent text-gray-300"
                            as="span"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded"
                        >
                          <EditableField
                            type="text"
                            value={tech}
                            onChange={(value) => handleChange(['projects', index.toString(), 'technologies', techIndex.toString()], value)}
                            className="bg-transparent"
                            as="span"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};