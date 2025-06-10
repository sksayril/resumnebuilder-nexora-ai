import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface ModernElegantProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
  onUpdate: (path: string[], value: string | string[]) => void;
}

export function ModernElegant({ resume, userPhoto, templateColor, onUpdate }: ModernElegantProps) {
  const { content } = resume;

  const handleChange = (path: string[], value: string | string[]) => {
    onUpdate(path, value);
  };

  return (
    <div className="max-w-5xl mx-auto p-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Modern Elegant Header */}
      <div className="relative mb-20">
        <div className="absolute inset-0 bg-gradient-to-r opacity-5" 
          style={{ 
            background: `linear-gradient(135deg, ${templateColor} 0%, transparent 100%)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
          }} 
        />
        <div className="relative flex flex-col md:flex-row items-center gap-16">
          {userPhoto && (
            <div className="w-48 h-48 relative group">
              <div className="absolute inset-0 rounded-2xl transform rotate-3 transition-transform duration-300 group-hover:rotate-6" 
                style={{ backgroundColor: templateColor, opacity: 0.1 }} 
              />
              <img
                src={userPhoto}
                alt={content.sections.header.name}
                className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-105"
                style={{ border: `3px solid ${templateColor}` }}
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-6xl font-light tracking-tight mb-4" style={{ color: templateColor }}>
              <EditableField
                type="text"
                value={content.sections.header.name}
                onChange={(value) => handleChange(['header', 'name'], value)}
                className="w-full"
                as="span"
              />
            </h1>
            <EditableField
              type="text"
              value={content.sections.header.title}
              onChange={(value) => handleChange(['header', 'title'], value)}
              className="text-2xl text-gray-600 dark:text-gray-400 font-light mb-8"
              as="span"
            />
            <div className="flex flex-wrap justify-center md:justify-start gap-8 text-gray-600 dark:text-gray-400">
              <EditableField
                type="text"
                value={content.sections.header.contact.email}
                onChange={(value) => handleChange(['header', 'contact', 'email'], value)}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
                as="span"
              />
              <EditableField
                type="text"
                value={content.sections.header.contact.phone}
                onChange={(value) => handleChange(['header', 'contact', 'phone'], value)}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
                as="span"
              />
              <EditableField
                type="text"
                value={content.sections.header.contact.location}
                onChange={(value) => handleChange(['header', 'contact', 'location'], value)}
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
                as="span"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-16">
          {/* Professional Summary */}
          <section className="relative p-10 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl">
            <div className="absolute inset-0 opacity-5" 
              style={{ 
                background: `radial-gradient(circle at top right, ${templateColor}, transparent 70%)`
              }} 
            />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: templateColor }} />
                <h2 className="text-3xl font-light tracking-wide" style={{ color: templateColor }}>
                  Professional Summary
                </h2>
              </div>
              <EditableField
                type="textarea"
                value={content.sections.summary}
                onChange={(value) => handleChange(['summary'], value)}
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                as="p"
              />
            </div>
          </section>

          {/* Experience */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: templateColor }} />
              <h2 className="text-3xl font-light tracking-wide" style={{ color: templateColor }}>
                Professional Experience
              </h2>
            </div>
            <div className="space-y-12">
              {content.sections.experience.map((exp, index) => (
                <div key={index} className="relative pl-10 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" 
                    style={{ backgroundColor: templateColor }} 
                  />
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full transform -translate-x-1/2" 
                    style={{ backgroundColor: templateColor }} 
                  />
                  <div className="text-2xl font-light mb-2 group-hover:translate-x-2 transition-transform" 
                    style={{ color: templateColor }}
                  >
                    <EditableField
                      type="text"
                      value={exp.title}
                      onChange={(value) => handleChange(['experience', index.toString(), 'title'], value)}
                      className="w-full"
                      as="span"
                    />
                  </div>
                  <EditableField
                    type="text"
                    value={exp.company}
                    onChange={(value) => handleChange(['experience', index.toString(), 'company'], value)}
                    className="text-xl text-gray-700 dark:text-gray-300 mb-2"
                    as="span"
                  />
                  <EditableField
                    type="text"
                    value={exp.duration}
                    onChange={(value) => handleChange(['experience', index.toString(), 'duration'], value)}
                    className="text-sm text-gray-500 mb-4"
                    as="span"
                  />
                  <ul className="list-none space-y-3 text-gray-600 dark:text-gray-400">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-lg flex items-start gap-3">
                        <span className="text-sm mt-2" style={{ color: templateColor }}>▹</span>
                        <EditableField
                          type="text"
                          value={achievement}
                          onChange={(value) => handleChange(['experience', index.toString(), 'achievements', i.toString()], value)}
                          as="span"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: templateColor }} />
              <h2 className="text-3xl font-light tracking-wide" style={{ color: templateColor }}>
                Notable Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.sections.projects?.map((project, index) => (
                <div key={index} 
                  className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                    style={{ backgroundColor: templateColor }} 
                  />
                  <div className="relative">
                    <div className="text-xl font-light mb-3 group-hover:translate-x-2 transition-transform" 
                      style={{ color: templateColor }}
                    >
                      <EditableField
                        type="text"
                        value={project.name}
                        onChange={(value) => handleChange(['projects', index.toString(), 'name'], value)}
                        className="w-full"
                        as="span"
                      />
                    </div>
                    <EditableField
                      type="textarea"
                      value={project.description}
                      onChange={(value) => handleChange(['projects', index.toString(), 'description'], value)}
                      className="text-gray-600 dark:text-gray-400 mb-4 text-lg"
                      as="p"
                    />
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 text-sm rounded-full font-light transition-all duration-300 hover:scale-105"
                          style={{ 
                            backgroundColor: `${templateColor}15`, 
                            color: templateColor,
                            boxShadow: `0 0 0 1px ${templateColor}30`
                          }}
                        >
                          <EditableField
                            type="text"
                            value={tech}
                            onChange={(value) => handleChange(['projects', index.toString(), 'technologies', i.toString()], value)}
                            className="bg-transparent"
                            as="span"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-16">
          {/* Skills */}
          <section className="relative p-8 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl">
            <div className="absolute inset-0 opacity-5" 
              style={{ 
                background: `radial-gradient(circle at bottom left, ${templateColor}, transparent 70%)`
              }} 
            />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: templateColor }} />
                <h2 className="text-3xl font-light tracking-wide" style={{ color: templateColor }}>
                  Core Competencies
                </h2>
              </div>
              <div className="space-y-6">
                {content.sections.skills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <div className="flex justify-between mb-2">
                      <EditableField
                        type="text"
                        value={skill}
                        onChange={(value) => handleChange(['skills', index.toString()], value)}
                        className="text-lg font-light text-gray-700 dark:text-gray-300 group-hover:translate-x-2 transition-transform"
                        as="span"
                      />
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 group-hover:scale-x-105"
                        style={{
                          width: '90%',
                          background: `linear-gradient(90deg, ${templateColor} 0%, ${templateColor}80 100%)`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 