import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { GeneratedResume } from '../../types';
import { EditableField } from '../EditableField';

interface CreativePortfolioProps {
  resume: GeneratedResume;
  userPhoto?: string;
  templateColor: string;
}

export const CreativePortfolio: React.FC<CreativePortfolioProps> = ({ resume, userPhoto, templateColor }) => {
  const { content } = resume;
  const { sections } = content;

  interface SkillBarProps {
    skill: string;
    level?: number;
  }

  const SkillBar: React.FC<SkillBarProps> = ({ skill, level = 80 }) => (
    <div className="mb-3">
      <div className="text-white text-sm mb-1">{skill}</div>
      <div className="bg-gray-600 rounded-full h-2">
        <div 
          className="bg-gray-400 h-2 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );

  const languages = [
    { name: 'Spanish', level: 70 },
    { name: 'English', level: 90 },
    { name: 'German', level: 85 }
  ];

  const technicalSkills = [
    { name: 'Excel', level: 85 },
    { name: 'Word', level: 80 },
    { name: 'Prezi', level: 75 },
    { name: 'Java', level: 70 }
  ];

  const interests = ['Hiking', 'Yoga', 'Reading', 'Crafts'];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-600 text-white p-6">
          {/* Profile Image */}
          <div className="mb-6">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={sections.header.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-32 h-32 mx-auto bg-gray-400 rounded-full flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-gray-500 rounded-full"></div>
              </div>
            )}
            <h1 className="text-2xl font-bold text-center mb-1">
              <EditableField
                type="text"
                value={sections.header.name}
                onChange={() => {}}
                className="bg-transparent text-white"
              />
            </h1>
            <h1 className="text-2xl font-bold text-center mb-2">SURNAME</h1>
            <div className="text-center text-sm uppercase tracking-wide">
              <EditableField
                type="text"
                value={sections.header.title}
                onChange={() => {}}
                className="bg-transparent text-white"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-500 pb-2">
              CONTACT
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <EditableField
                  type="text"
                  value={sections.header.contact.location}
                  onChange={() => {}}
                  className="bg-transparent text-white"
                />
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <EditableField
                  type="text"
                  value={sections.header.contact.email}
                  onChange={() => {}}
                  className="bg-transparent text-white"
                />
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <EditableField
                  type="text"
                  value={sections.header.contact.phone}
                  onChange={() => {}}
                  className="bg-transparent text-white"
                />
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-500 pb-2">
              INTERESTS
            </h2>
            <div className="space-y-2 text-sm">
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-500 pb-2">
              LANGUAGES
            </h2>
            {languages.map((language, index) => (
              <SkillBar key={index} skill={language.name} level={language.level} />
            ))}
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 border-b border-gray-500 pb-2">
              SKILLS
            </h2>
            <div className="space-y-2">
              {sections.skills.map((skill: string, index: number) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">✓</span>
                  <EditableField
                    type="text"
                    value={skill}
                    onChange={() => {}}
                    className="bg-transparent text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {/* Profile Summary */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-gray-600 mr-3"></div>
              <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wide">
                Profile Summary
              </h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              <EditableField
                type="textarea"
                value={sections.summary}
                onChange={() => {}}
                className="bg-transparent"
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-gray-600 rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wide">
                Work Experience
              </h2>
            </div>
            
            {sections.experience.map((job: any, index: number) => (
              <div key={index} className="mb-6">
                <div className="text-sm text-gray-600 mb-1">
                  <EditableField
                    type="text"
                    value={job.duration}
                    onChange={() => {}}
                    className="bg-transparent"
                  />
                </div>
                <div className="text-sm text-gray-600 mb-1">City, Country</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  <EditableField
                    type="text"
                    value={job.company}
                    onChange={() => {}}
                    className="bg-transparent"
                  />
                </h3>
                <div className="text-gray-700 mb-2">
                  <EditableField
                    type="text"
                    value={job.title}
                    onChange={() => {}}
                    className="bg-transparent"
                  />
                </div>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  {job.achievements.map((achievement: string, achIndex: number) => (
                    <li key={achIndex}>
                      <EditableField
                        type="text"
                        value={achievement}
                        onChange={() => {}}
                        className="bg-transparent"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-gray-600 mr-3" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}>♥</div>
              <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wide">
                Education
              </h2>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">20XX - 20XX</div>
              <h3 className="text-lg font-bold text-gray-800">MBA Business Administration</h3>
              <div className="text-gray-600 italic">NYU</div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">20XX - 20XX</div>
              <h3 className="text-lg font-bold text-gray-800">BA Business Administration</h3>
              <div className="text-gray-600 italic">NYU</div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-6 h-6 bg-gray-600 mr-3"></div>
              <h2 className="text-xl font-bold text-gray-700 uppercase tracking-wide">
                Projects
              </h2>
            </div>
            
            {sections.projects.map((project: any, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  <EditableField
                    type="text"
                    value={project.name}
                    onChange={() => {}}
                    className="bg-transparent"
                  />
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  <EditableField
                    type="textarea"
                    value={project.description}
                    onChange={() => {}}
                    className="bg-transparent"
                  />
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
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
        </div>
      </div>
    </div>
  );
};