import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';

interface ElegantHRProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
  onUpdate: (path: string[], value: string | string[]) => void;
}

export const ElegantHR: React.FC<ElegantHRProps> = ({ resume, userPhoto, templateColor, onUpdate }) => {
  const { content } = resume;

  const handleChange = (path: string[], value: string | string[]) => {
    onUpdate(path, value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-700 text-white p-8">
          {/* Profile Picture Placeholder */}
          <div className="mb-8 flex justify-center">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={content.sections.header.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-32 h-32 bg-slate-600 rounded-full flex items-center justify-center border-4 border-white">
                <User size={48} className="text-slate-300" />
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-slate-500 pb-2">CONTACT</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <EditableField
                  type="text"
                  value={content.sections.header.contact.phone}
                  onChange={(value) => handleChange(['header', 'contact', 'phone'], value)}
                  className="text-sm bg-transparent text-white"
                  as="span"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <EditableField
                  type="text"
                  value={content.sections.header.contact.email}
                  onChange={(value) => handleChange(['header', 'contact', 'email'], value)}
                  className="text-sm bg-transparent text-white"
                  as="span"
                />
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} />
                <EditableField
                  type="text"
                  value={content.sections.header.contact.location}
                  onChange={(value) => handleChange(['header', 'contact', 'location'], value)}
                  className="text-sm bg-transparent text-white"
                  as="span"
                />
              </div>
              {content.sections.header.contact.github && (
                <div className="flex items-center space-x-3">
                  <Globe size={16} />
                  <EditableField
                    type="text"
                    value={content.sections.header.contact.github}
                    onChange={(value) => handleChange(['header', 'contact', 'github'], value)}
                    className="text-sm bg-transparent text-white"
                    as="span"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-slate-500 pb-2">SKILLS</h2>
            <ul className="space-y-2">
              {content.sections.skills.map((skill, index) => (
                <li key={index} className="text-sm">
                  • <EditableField
                      type="text"
                      value={skill}
                      onChange={(value) => handleChange(['skills', index.toString()], value)}
                      className="bg-transparent text-white"
                      as="span"
                    />
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-slate-500 pb-2">PROJECTS</h2>
            <div className="space-y-4">
              {content.sections.projects?.map((project, index) => (
                <div key={index}>
                  <EditableField
                    type="text"
                    value={project.name}
                    onChange={(value) => handleChange(['projects', index.toString(), 'name'], value)}
                    className="font-semibold text-sm mb-1 bg-transparent text-white"
                    as="span"
                  />
                  <EditableField
                    type="textarea"
                    value={project.description}
                    onChange={(value) => handleChange(['projects', index.toString(), 'description'], value)}
                    className="text-xs text-slate-300 mb-2 bg-transparent"
                    as="p"
                  />
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-slate-600 px-2 py-1 rounded">
                        <EditableField
                          type="text"
                          value={tech}
                          onChange={(value) => handleChange(['projects', index.toString(), 'technologies', techIndex.toString()], value)}
                          className="bg-transparent text-white"
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

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Header */}
          <div className="mb-8">
            <EditableField
              type="text"
              value={content.sections.header.name}
              onChange={(value) => handleChange(['header', 'name'], value)}
              className="text-4xl font-bold text-gray-800 mb-2 w-full"
              as="span"
            />
            <EditableField
              type="text"
              value={content.sections.header.title}
              onChange={(value) => handleChange(['header', 'title'], value)}
              className="text-xl font-medium text-gray-600 mb-4 border-b-2 border-gray-300 pb-2 w-full"
              as="span"
            />
          </div>

          {/* Profile/Summary Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
              PROFILE
            </h2>
            <EditableField
              type="textarea"
              value={content.sections.summary}
              onChange={(value) => handleChange(['summary'], value)}
              className="text-gray-700 leading-relaxed text-justify w-full"
              as="p"
            />
          </div>

          {/* Work Experience Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {content.sections.experience.map((job, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <EditableField
                        type="text"
                        value={job.company}
                        onChange={(value) => handleChange(['experience', index.toString(), 'company'], value)}
                        className="text-lg font-semibold text-gray-800"
                        as="span"
                      />
                      <EditableField
                        type="text"
                        value={job.title}
                        onChange={(value) => handleChange(['experience', index.toString(), 'title'], value)}
                        className="text-gray-600 font-medium"
                        as="span"
                      />
                    </div>
                    <EditableField
                      type="text"
                      value={job.duration}
                      onChange={(value) => handleChange(['experience', index.toString(), 'duration'], value)}
                      className="text-sm text-gray-500 font-medium"
                      as="span"
                    />
                  </div>
                  <ul className="mt-3 space-y-2">
                    {job.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-gray-700 text-sm leading-relaxed flex">
                        <span className="mr-3">•</span>
                        <EditableField
                          type="text"
                          value={achievement}
                          onChange={(value) => handleChange(['experience', index.toString(), 'achievements', achIndex.toString()], value)}
                          className="flex-1"
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
    </div>
  );
};