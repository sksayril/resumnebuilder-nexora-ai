import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface CorporateClassicProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

export function CorporateClassic({ resume, userPhoto, templateColor }: CorporateClassicProps) {
  const { content } = resume;

  return (
    <div className="max-w-4xl bg-red-700 mx-auto p-8">
      {/* Header with Classic Layout */}
      <div className="border-b-2 pb-8 mb-8" style={{ borderColor: templateColor }}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1>hello world resume</h1>
            <div className={`text-4xl font-serif font-bold mb-2`} style={{ color: templateColor }}>
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
            <div className="flex flex-wrap gap-4 text-gray-600">
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
          {userPhoto && (
            <div className="ml-8">
              <img
                src={userPhoto}
                alt={content.sections.header.name}
                className="w-32 h-32 object-cover border-4"
                style={{ borderColor: templateColor }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8">
        <h6>wecuyqcbqc</h6>
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* Professional Summary */}
          <section>
            <h2 className="text-xl font-serif font-bold mb-4 pb-2 border-b" style={{ borderColor: templateColor }}>
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
            <h2 className="text-xl font-serif font-bold mb-6 pb-2 border-b" style={{ borderColor: templateColor }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {content.sections.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2" style={{ borderColor: templateColor }}>
                  <div className={`text-lg font-semibold`} style={{ color: templateColor }}>
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
                    className="text-gray-700"
                  />
                  <EditableField
                    type="text"
                    value={exp.duration}
                    onChange={(value) => {}}
                    className="text-sm text-gray-500 mb-2"
                  />
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
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
            <h5>wcbuwyexb</h5>
            <h2 className="text-xl font-serif font-bold mb-6 pb-2 border-b" style={{ borderColor: templateColor }}>
              Key Projects
            </h2>
            <div className="space-y-6">
              {content.sections.projects?.map((project, index) => (
                <div key={index} className="border p-4" style={{ borderColor: templateColor }}>
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
                    className="text-sm text-gray-600 mb-3"
                  />
                  <h5>enwiex q wxiwex w qwihxiqbxw</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs border"
                        style={{ borderColor: templateColor, color: templateColor }}
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

        {/* Right Column */}
        <div className="col-span-4 space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-xl font-serif font-bold mb-4 pb-2 border-b" style={{ borderColor: templateColor }}>
              Core Competencies
            </h2>
            <div className="space-y-3">
              {content.sections.skills.map((skill, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200">
                    <div
                      className="h-full transition-all duration-500"
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