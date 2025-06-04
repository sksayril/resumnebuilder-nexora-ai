import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface MinimalistProProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

export function MinimalistPro({ resume, userPhoto, templateColor }: MinimalistProProps) {
  const { content } = resume;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      {/* Header Section with Asymmetric Layout */}
      <div className="grid grid-cols-12 gap-8 mb-12">
        <div className="col-span-8">
          <EditableField
            type="text"
            value={content.sections.header.name}
            onChange={(value) => {}}
            className="text-5xl font-bold tracking-tight"
            style={{ color: templateColor }}
          />
          <EditableField
            type="text"
            value={content.sections.header.title}
            onChange={(value) => {}}
            className="text-2xl mt-2 text-gray-600"
          />
        </div>
        {userPhoto && (
          <div className="col-span-4 flex justify-end">
            <img
              src={userPhoto}
              alt={content.sections.header.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-offset-4"
              style={{ ringColor: templateColor }}
            />
          </div>
        )}
      </div>

      {/* Contact Information with Modern Icons */}
      <div className="flex flex-wrap gap-6 mb-12 text-gray-600">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-12">
        {/* Left Column - Experience & Projects */}
        <div className="col-span-8 space-y-12">
          {/* Professional Summary */}
          <section>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: templateColor }}>
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
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: templateColor }}>
              Experience
            </h2>
            <div className="space-y-8">
              {content.sections.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5"
                  style={{ ['--tw-before-bg' as string]: templateColor }}>
                  <EditableField
                    type="text"
                    value={exp.title}
                    onChange={(value) => {}}
                    className="text-xl font-semibold"
                    style={{ color: templateColor }}
                  />
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
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: templateColor }}>
              Projects
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {content.sections.projects?.map((project, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <EditableField
                    type="text"
                    value={project.name}
                    onChange={(value) => {}}
                    className="text-lg font-semibold mb-2"
                    style={{ color: templateColor }}
                  />
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
                        className="px-2 py-1 text-xs rounded-full"
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
        <div className="col-span-4 space-y-12">
          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ borderColor: templateColor }}>
              Skills
            </h2>
            <div className="space-y-4">
              {content.sections.skills.map((skill, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
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

          {/* Additional Sections can be added here */}
        </div>
      </div>
    </div>
  );
} 