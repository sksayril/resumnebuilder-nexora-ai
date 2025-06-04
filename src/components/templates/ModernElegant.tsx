import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface ModernElegantProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

export function ModernElegant({ resume, userPhoto, templateColor }: ModernElegantProps) {
  const { content } = resume;

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white shadow-2xl rounded-2xl">
      {/* Header Section with Modern Layout */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        {userPhoto && (
          <div className="w-40 h-40 md:w-48 md:h-48">
            <img
              src={userPhoto}
              alt={content.sections.header.name}
              className="w-full h-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        )}
        <div className="flex-1 text-center md:text-left">
          <div className={`text-6xl font-bold tracking-tight mb-4`} style={{ color: templateColor }}>
            <EditableField
              type="text"
              value={content.sections.header.name}
              onChange={(value) => {}}
              className="w-full"
            />
          </div>
          <EditableField
            type="text"
            value={content.sections.header.title}
            onChange={(value) => {}}
            className="text-2xl text-gray-600 mb-6"
          />
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-600">
            <EditableField
              type="text"
              value={content.sections.header.contact.email}
              onChange={(value) => {}}
              className="flex items-center gap-2"
            />
            <EditableField
              type="text"
              value={content.sections.header.contact.phone}
              onChange={(value) => {}}
              className="flex items-center gap-2"
            />
            <EditableField
              type="text"
              value={content.sections.header.contact.location}
              onChange={(value) => {}}
              className="flex items-center gap-2"
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Experience & Projects */}
        <div className="lg:col-span-8 space-y-12">
          {/* Professional Summary */}
          <section className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4" style={{ color: templateColor }}>
              Professional Summary
            </h2>
            <EditableField
              type="textarea"
              value={content.sections.summary}
              onChange={(value) => {}}
              className="text-gray-700 leading-relaxed"
            />
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: templateColor }}>
              Experience
            </h2>
            <div className="space-y-8">
              {content.sections.experience.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2" style={{ borderColor: templateColor }}>
                  <div className={`text-xl font-semibold`} style={{ color: templateColor }}>
                    <EditableField
                      type="text"
                      value={exp.title}
                      onChange={(value) => {}}
                      className="w-full"
                    />
                  </div>
                  <EditableField
                    type="text"
                    value={exp.company}
                    onChange={(value) => {}}
                    className="text-lg text-gray-700"
                  />
                  <EditableField
                    type="text"
                    value={exp.duration}
                    onChange={(value) => {}}
                    className="text-sm text-gray-500 mb-3"
                  />
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>
                        <EditableField
                          type="text"
                          value={achievement}
                          onChange={(value) => {}}
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
            <h2 className="text-2xl font-bold mb-6" style={{ color: templateColor }}>
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.sections.projects?.map((project, index) => (
                <div key={index} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                  <div className={`text-lg font-semibold mb-2`} style={{ color: templateColor }}>
                    <EditableField
                      type="text"
                      value={project.name}
                      onChange={(value) => {}}
                      className="w-full"
                    />
                  </div>
                  <EditableField
                    type="textarea"
                    value={project.description}
                    onChange={(value) => {}}
                    className="text-sm text-gray-600 mb-4"
                  />
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{ backgroundColor: `${templateColor}20`, color: templateColor }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Skills & Additional Info */}
        <div className="lg:col-span-4 space-y-12">
          {/* Skills */}
          <section className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6" style={{ color: templateColor }}>
              Skills
            </h2>
            <div className="space-y-4">
              {content.sections.skills.map((skill, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: '85%',
                        backgroundColor: templateColor
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 