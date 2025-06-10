import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';
import { Mail, Phone, MapPin, Github, Linkedin, User } from 'lucide-react';

interface TechInnovatorProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
  onUpdate: (path: string[], value: string | string[]) => void;
}

export const TechInnovator: React.FC<TechInnovatorProps> = ({ resume, userPhoto, templateColor, onUpdate }) => {
  const { content } = resume;
  const { sections } = content;

  const handleChange = (path: string[], value: string | string[]) => {
    onUpdate(path, value);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-8 h-8" style={{ backgroundColor: templateColor }}></div>
      <div className="absolute top-4 left-12 w-6 h-6 bg-gray-800 dark:bg-gray-700"></div>
      <div className="absolute top-8 right-20 w-4 h-4 bg-gray-200 dark:bg-gray-600"></div>
      
      <div className="grid grid-cols-12 min-h-screen">
        {/* Left Side - Light Background */}
        <div className="col-span-5 bg-gray-50 dark:bg-gray-800 p-8 relative">
          {/* Header */}
          <div className="bg-gray-900 dark:bg-black text-white p-6 mb-8 relative z-10">
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Contact Me:</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
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
              {sections.header.contact.github && (
                <div className="flex items-center">
                  <Github size={16} className="mr-2" />
                  <EditableField
                    type="text"
                    value={sections.header.contact.github}
                    onChange={(value) => handleChange(['header', 'contact', 'github'], value)}
                    className="bg-transparent"
                    as="span"
                  />
                </div>
              )}
              {sections.header.contact.linkedin && (
                <div className="flex items-center">
                  <Linkedin size={16} className="mr-2" />
                  <EditableField
                    type="text"
                    value={sections.header.contact.linkedin}
                    onChange={(value) => handleChange(['header', 'contact', 'linkedin'], value)}
                    className="bg-transparent"
                    as="span"
                  />
                </div>
              )}
            </div>
          </div>

          {/* About Me */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">About Me</h3>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">Skills</h3>
            <div className="space-y-4">
              {sections.skills.map((skill: string, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                      <EditableField
                        type="text"
                        value={skill}
                        onChange={(value) => handleChange(['skills', index.toString()], value)}
                        className="bg-transparent"
                        as="span"
                      />
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 relative">
                    <div className="h-2 w-4/5 relative" style={{ backgroundColor: templateColor }}>
                      <div className="absolute right-0 top-0 w-3 h-3 rounded-full transform translate-x-1 -translate-y-0.5" style={{ backgroundColor: templateColor }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Image and Dark Sections */}
        <div className="col-span-7 relative">
          {/* Main Image Area */}
          <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative flex items-center justify-center">
            <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              {userPhoto ? (
                <img src={userPhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={120} className="text-gray-500 dark:text-gray-400" />
              )}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-gray-900 dark:bg-black text-white">
            <div className="flex">
              <div className="w-32 bg-gray-800 dark:bg-gray-900 flex items-center justify-center">
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
                            className="bg-transparent text-gray-300"
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

          {/* Projects Section */}
          <div className="bg-gray-900 dark:bg-black text-white">
            <div className="flex">
              <div className="w-32 bg-gray-800 dark:bg-gray-900 flex items-center justify-center">
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
                        <div className="text-sm text-gray-300">2020 - 2024</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 leading-relaxed mb-2">
                      <EditableField
                        type="textarea"
                        value={project.description}
                        onChange={(value) => handleChange(['projects', index.toString(), 'description'], value)}
                        className="bg-transparent text-gray-300"
                        as="p"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <span key={techIndex} className="text-xs bg-gray-800 px-2 py-1 rounded">
                          <EditableField
                            type="text"
                            value={tech}
                            onChange={(value) => handleChange(['projects', index.toString(), 'technologies', techIndex.toString()], value)}
                            className="bg-transparent text-gray-300"
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