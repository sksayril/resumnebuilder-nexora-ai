import React from 'react';
import { Mail, Phone, MapPin, Globe, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface MinimalistModernProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

interface SectionHeaderProps {
  title: string;
  bgColor?: string;
}

export const MinimalistModern: React.FC<MinimalistModernProps> = ({ resume, userPhoto, templateColor }) => {
  const { content } = resume;
  const { sections } = content;

  const SectionHeader: React.FC<SectionHeaderProps> = ({ title, bgColor = "bg-teal-400" }) => (
    <div className={`${bgColor} text-white px-4 py-2 rounded-full inline-block mb-4`}>
      <h2 className="text-sm font-semibold italic">{title}</h2>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="relative">
        {/* Teal Background Strip */}
        <div className="bg-teal-400 h-64 relative">
          {/* Profile Image */}
          <div className="absolute bottom-0 left-8 transform translate-y-1/2">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={sections.header.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-32 h-32 bg-teal-400 rounded-full p-1">
                <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Name and Title */}
        <div className="pt-20 pb-8 px-8">
          <div className="ml-40">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              <EditableField
                type="text"
                value={sections.header.name}
                onChange={() => {}}
                className="bg-transparent"
              />
            </h1>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SURNAME</h1>
            <div className="text-teal-400 text-lg italic font-medium">
              <EditableField
                type="text"
                value={sections.header.title}
                onChange={() => {}}
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Profile Section */}
        <div className="mb-8">
          <SectionHeader title="Profile" />
          <div className="text-gray-700 leading-relaxed text-sm">
            <EditableField
              type="textarea"
              value={sections.summary}
              onChange={() => {}}
              className="bg-transparent"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-8">
          <SectionHeader title="Contact" />
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-teal-400" />
              <EditableField
                type="text"
                value={sections.header.contact.phone}
                onChange={() => {}}
                className="bg-transparent"
              />
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-teal-400" />
              <EditableField
                type="text"
                value={sections.header.contact.location}
                onChange={() => {}}
                className="bg-transparent"
              />
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-teal-400" />
              <span>www.website.com</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal-400" />
              <EditableField
                type="text"
                value={sections.header.contact.email}
                onChange={() => {}}
                className="bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Find Me Online Section */}
        <div className="mb-8">
          <SectionHeader title="Find Me Online" />
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
              <Twitter className="w-4 h-4 mr-2 text-teal-400" />
              <span>Twitter.com/profile</span>
            </div>
            <div className="flex items-center">
              <Linkedin className="w-4 h-4 mr-2 text-teal-400" />
              <span>Linkdin.com/profile</span>
            </div>
            <div className="flex items-center">
              <Instagram className="w-4 h-4 mr-2 text-teal-400" />
              <span>Instagram.com/profile</span>
            </div>
            <div className="flex items-center">
              <Facebook className="w-4 h-4 mr-2 text-teal-400" />
              <span>Facebook.com/profile</span>
            </div>
          </div>
        </div>

        {/* Work Summary Section */}
        <div className="mb-8">
          <SectionHeader title="Work Summary" />
          
          {sections.experience.map((job: any, index: number) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">
                    <EditableField
                      type="text"
                      value={job.title}
                      onChange={() => {}}
                      className="bg-transparent"
                    />
                  </h3>
                  <div className="text-sm text-gray-600">
                    <EditableField
                      type="text"
                      value={job.company}
                      onChange={() => {}}
                      className="bg-transparent"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">
                    <EditableField
                      type="text"
                      value={job.duration}
                      onChange={() => {}}
                      className="bg-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-700 space-y-1">
                {job.achievements.map((achievement: string, achIndex: number) => (
                  <div key={achIndex}>
                    <EditableField
                      type="text"
                      value={achievement}
                      onChange={() => {}}
                      className="bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <SectionHeader title="Projects" />
          
          {sections.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold text-gray-800 mb-1">
                <EditableField
                  type="text"
                  value={project.name}
                  onChange={() => {}}
                  className="bg-transparent"
                />
              </h3>
              <div className="text-sm text-gray-700 mb-2">
                <EditableField
                  type="textarea"
                  value={project.description}
                  onChange={() => {}}
                  className="bg-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <span key={techIndex} className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">
                    <EditableField
                      type="text"
                      value={tech}
                      onChange={() => {}}
                      className="bg-transparent"
                    />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <SectionHeader title="Skills" />
          <div className="flex flex-wrap gap-2">
            {sections.skills.map((skill: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                <EditableField
                  type="text"
                  value={skill}
                  onChange={() => {}}
                  className="bg-transparent"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};