import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface MinimalistModernProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

export function MinimalistModern({ resume, userPhoto, templateColor }: MinimalistModernProps) {
  const { content } = resume;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {userPhoto && (
            <div className="w-32 h-32 md:w-40 md:h-40">
              <img
                src={userPhoto}
                alt={content.sections.header.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <div className={`text-4xl font-light tracking-wide mb-2`} style={{ color: templateColor }}>
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
              className="text-xl text-gray-600 mb-4"
            />
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <EditableField
                type="text"
                value={content.sections.header.contact.email}
                onChange={(value) => {}}
                className="flex items-center gap-1"
              />
              <EditableField
                type="text"
                value={content.sections.header.contact.phone}
                onChange={(value) => {}}
                className="flex items-center gap-1"
              />
              <EditableField
                type="text"
                value={content.sections.header.contact.location}
                onChange={(value) => {}}
                className="flex items-center gap-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Professional Summary */}
        <section>
          <h2 className="text-lg font-medium mb-4" style={{ color: templateColor }}>
            Summary
          </h2>
          <EditableField
            type="textarea"
            value={content.sections.summary}
            onChange={(value) => {}}
            className="text-gray-600 leading-relaxed"
          />
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-medium mb-6" style={{ color: templateColor }}>
            Experience
          </h2>
          <div className="space-y-8">
            {content.sections.experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div className={`text-lg font-medium`} style={{ color: templateColor }}>
                    <EditableField
                      type="text"
                      value={exp.title}
                      onChange={(value) => {}}
                      className="w-full"
                    />
                  </div>
                  <EditableField
                    type="text"
                    value={exp.duration}
                    onChange={(value) => {}}
                    className="text-sm text-gray-500"
                  />
                </div>
                <EditableField
                  type="text"
                  value={exp.company}
                  onChange={(value) => {}}
                  className="text-gray-600 mb-3"
                />
                <ul className="list-none space-y-2 text-gray-600">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: templateColor }} />
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
          <h2 className="text-lg font-medium mb-6" style={{ color: templateColor }}>
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.sections.projects?.map((project, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200">
                <div className={`text-base font-medium mb-2`} style={{ color: templateColor }}>
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
                  className="text-sm text-gray-600 mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs rounded"
                      style={{ backgroundColor: `${templateColor}10`, color: templateColor }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-medium mb-6" style={{ color: templateColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {content.sections.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: `${templateColor}10`, color: templateColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 