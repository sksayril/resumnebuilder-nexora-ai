import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, User, Star, GraduationCap, Award } from 'lucide-react';
import { EditableField } from '../EditableField';

interface ResumeSection {
  header: {
    name: string;
    title: string;
    contact: {
      phone: string;
      email: string;
      location: string;
      github?: string;
      linkedin?: string;
    };
  };
  summary: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
  }>;
}

interface ProfessionalBlueResumeProps {
  resume?: {
    content: {
      sections: ResumeSection;
    };
  };
  userPhoto?: string;
  templateColor?: string;
  onUpdate: (path: string[], value: string | string[]) => void;
}

export default function MinimalistModern({ 
  resume, 
  userPhoto, 
  templateColor = "#1e3a8a",
  onUpdate
}: ProfessionalBlueResumeProps) {
  // Default data structure matching the image
  const defaultData: ResumeSection = {
    header: {
      name: "DANIEL MICARDO",
      title: "TEACHER",
      contact: {
        phone: "+1234-5678-9012",
        email: "danielmicardo@email.com",
        location: "3877 Clinton Street Portland"
      }
    },
    summary: "Enthusiastic and creative English Teacher with 7+ years of classroom teaching experience. A dedicated teacher who is easily adaptable to different learning styles.",
    skills: ["Teaching", "Curriculum Development", "Classroom Management"],
    experience: [
      {
        title: "Substitute Teacher",
        company: "King School",
        duration: "2011-2012",
        achievements: ["Taught English and History summer school classes for 3rd and 4th grade students who had fallen behind."]
      },
      {
        title: "Second Grade Teacher",
        company: "Magnolia School",
        duration: "2011-2012",
        achievements: ["Provided a variety of hands-on learning experiences that included the use of modern teaching methods."]
      }
    ],
    projects: [
      {
        name: "Educational App Development",
        description: "Led the development of an educational app for elementary students",
        technologies: ["React", "Node.js", "MongoDB"]
      }
    ]
  };

  const sections = resume?.content?.sections || defaultData;

  const handleChange = (path: string[], value: string | string[]) => {
    onUpdate(path, value);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden">
      <div className="grid grid-cols-12">
        {/* Left Sidebar - Blue Section */}
        <div className="col-span-5 bg-blue-800 text-white p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <EditableField
                type="text"
                value={sections.header.name}
                onChange={(value) => handleChange(['header', 'name'], value)}
                className="bg-transparent text-white text-center w-full font-bold text-3xl"
              />
            </h1>
            <div className="text-lg font-light tracking-wider">
              <EditableField
                type="text"
                value={sections.header.title}
                onChange={(value) => handleChange(['header', 'title'], value)}
                className="bg-transparent text-white text-center w-full"
              />
            </div>
          </div>

          {/* Profile Photo */}
          <div className="flex justify-center mb-8">
            <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
              {userPhoto ? (
                <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={80} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Right Section - White Background */}
        <div className="col-span-7 bg-gray-50">
          {/* Contact Information */}
          <div className="bg-white p-6 border-b border-gray-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-white" />
                </div>
                <EditableField
                  type="text"
                  value={sections.header.contact.phone}
                  onChange={(value) => handleChange(['header', 'contact', 'phone'], value)}
                  className="bg-transparent text-gray-700"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                  <Mail size={16} className="text-white" />
                </div>
                <EditableField
                  type="text"
                  value={sections.header.contact.email}
                  onChange={(value) => handleChange(['header', 'contact', 'email'], value)}
                  className="bg-transparent text-gray-700"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-white" />
                </div>
                <EditableField
                  type="text"
                  value={sections.header.contact.location}
                  onChange={(value) => handleChange(['header', 'contact', 'location'], value)}
                  className="bg-transparent text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mr-3">
                <User size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-wide">Profile</h2>
            </div>
            <div className="border-b-2 border-blue-800 w-16 mb-4"></div>
            <div className="text-gray-700 leading-relaxed">
              <EditableField
                type="textarea"
                value={sections.summary}
                onChange={(value) => handleChange(['summary'], value)}
                className="bg-transparent w-full text-gray-700"
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mr-3">
                <Star size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-wide">Experience</h2>
            </div>
            <div className="border-b-2 border-blue-800 w-16 mb-4"></div>
            <div className="space-y-6">
              {sections.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-gray-800">
                      <EditableField
                        type="text"
                        value={`${exp.duration} ${exp.company}`}
                        onChange={(value) => {
                          const [duration, ...companyParts] = (value as string).split(' ');
                          handleChange(['experience', index.toString(), 'duration'], duration);
                          handleChange(['experience', index.toString(), 'company'], companyParts.join(' '));
                        }}
                        className="bg-transparent font-bold"
                      />
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium mb-2">
                    <EditableField
                      type="text"
                      value={exp.title}
                      onChange={(value) => handleChange(['experience', index.toString(), 'title'], value)}
                      className="bg-transparent"
                    />
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="mb-1">
                        <EditableField
                          type="text"
                          value={achievement}
                          onChange={(value) => handleChange(['experience', index.toString(), 'achievements', achIndex.toString()], value)}
                          className="bg-transparent w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mr-3">
                <Star size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-wide">Skills</h2>
            </div>
            <div className="border-b-2 border-blue-800 w-16 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {sections.skills.map((skill, index) => (
                <EditableField
                  key={index}
                  type="text"
                  value={skill}
                  onChange={(value) => handleChange(['skills', index.toString()], value)}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                />
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mr-3">
                <Award size={16} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-blue-800 uppercase tracking-wide">Projects</h2>
            </div>
            <div className="border-b-2 border-blue-800 w-16 mb-4"></div>
            <div className="space-y-4">
              {sections.projects.map((project, index) => (
                <div key={index} className="text-gray-700">
                  <div className="font-bold text-gray-800 mb-1">
                    <EditableField
                      type="text"
                      value={project.name}
                      onChange={(value) => handleChange(['projects', index.toString(), 'name'], value)}
                      className="bg-transparent"
                    />
                  </div>
                  <div className="text-sm mb-2">
                    <EditableField
                      type="text"
                      value={project.description}
                      onChange={(value) => handleChange(['projects', index.toString(), 'description'], value)}
                      className="bg-transparent"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <EditableField
                        key={techIndex}
                        type="text"
                        value={tech}
                        onChange={(value) => handleChange(['projects', index.toString(), 'technologies', techIndex.toString()], value)}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}