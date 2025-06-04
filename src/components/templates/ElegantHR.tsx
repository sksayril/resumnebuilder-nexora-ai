import React from 'react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface ElegantHRProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

export const ElegantHR: React.FC<ElegantHRProps> = ({ resume, userPhoto, templateColor }) => {
  const { sections } = resume.content;
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-8 px-2">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-[#23272F] text-white px-8 pt-8 pb-6 relative flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <EditableField
              type="text"
              value={sections.header.name}
              onChange={() => {}}
              className="text-3xl font-bold mb-1"
            />
            <EditableField
              type="text"
              value={sections.header.title}
              onChange={() => {}}
              className="text-lg font-semibold mb-4"
              // style={{ color: '#FFD166' }}
            />
            <EditableField
              type="textarea"
              value={sections.summary}
              onChange={() => {}}
              className="text-sm text-gray-100 mb-2 max-w-2xl"
            />
          </div>
          <div className="flex flex-col items-end mt-6 md:mt-0 md:ml-8">
            <div className="flex flex-col gap-2 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <span className="material-icons text-[#FFD166]">mail</span>
                <EditableField type="text" value={sections.header.contact.email} onChange={() => {}} className="" />
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-[#FFD166]">phone</span>
                <EditableField type="text" value={sections.header.contact.phone} onChange={() => {}} className="" />
              </div>
              <div className="flex items-center gap-2">
                <span className="material-icons text-[#FFD166]">location_on</span>
                <EditableField type="text" value={sections.header.contact.location} onChange={() => {}} className="" />
              </div>
              {sections.header.contact.linkedin && (
                <div className="flex items-center gap-2">
                  <span className="material-icons text-[#FFD166]">public</span>
                  <EditableField type="text" value={sections.header.contact.linkedin} onChange={() => {}} className="" />
                </div>
              )}
              {sections.header.contact.github && (
                <div className="flex items-center gap-2">
                  <span className="material-icons text-[#FFD166]">alternate_email</span>
                  <EditableField type="text" value={sections.header.contact.github} onChange={() => {}} className="" />
                </div>
              )}
            </div>
            {userPhoto && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mt-4">
                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 px-8 py-8">
          {/* Left Column: Work Experience */}
          <div className="flex-1 min-w-0">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
              <span className="material-icons text-xl text-[#23272F]">work</span>
              WORK EXPERIENCE
            </h2>
            {sections.experience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <EditableField
                  type="text"
                  value={exp.title}
                  onChange={() => {}}
                  className="font-bold text-base text-gray-900"
                />
                <div className="flex flex-wrap items-center text-xs text-gray-600 mb-1 gap-2">
                  <EditableField type="text" value={exp.company} onChange={() => {}} className="font-semibold" />
                  <span className="text-gray-400">|</span>
                  <EditableField type="text" value={exp.duration} onChange={() => {}} className="italic" />
                </div>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {exp.achievements?.map((item, i) => (
                    <li key={i}>
                      <EditableField type="text" value={item} onChange={() => {}} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column: Skills, Courses, Certificates, Education, Languages */}
          <div className="w-full md:w-80 flex-shrink-0">
            {/* Skills */}
            <div className="mb-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-2">
                <span className="material-icons text-xl text-[#23272F]">psychology</span>
                SKILLS & COMPETENCIES
              </h2>
              <div className="flex flex-wrap gap-2">
                {sections.skills.map((skill, idx) => (
                  <span key={idx} className="bg-gray-200 text-gray-800 rounded px-3 py-1 text-xs font-medium">
                    <EditableField type="text" value={skill} onChange={() => {}} />
                  </span>
                ))}
              </div>
            </div>
            {/* Conferences & Courses */}
            {/* Not present in base ResumeData, add if you extend the type */}
            {/* Certificates */}
            {/* Not present in base ResumeData, add if you extend the type */}
            {/* Education */}
            <div className="mb-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-2">
                <span className="material-icons text-xl text-[#23272F]">school</span>
                EDUCATION
              </h2>
              <ul className="list-none pl-0 text-sm text-gray-700">
                {sections.projects.map((edu, idx) => (
                  <li key={idx} className="mb-1">
                    <EditableField type="text" value={edu.name} onChange={() => {}} className="font-semibold" />
                    <span className="ml-1">
                      <EditableField type="text" value={edu.description} onChange={() => {}} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Languages */}
            {/* Not present in base ResumeData, add if you extend the type */}
          </div>
        </div>
      </div>
    </div>
  );
}; 