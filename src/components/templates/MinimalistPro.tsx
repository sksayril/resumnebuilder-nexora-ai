import React from 'react';
import { Phone, Mail, MapPin, Building } from 'lucide-react';

const MinimalistPro = () => {
  // API response data
  const resumeData = {
    sections: {
      header: {
        name: "wzw",
        title: "wzwz",
        contact: {
          email: "qwzqw@gmail.com",
          phone: "(123) 131-2211",
          location: "wwxw",
          github: "",
          linkedin: ""
        }
      },
      summary: "Passionate wzwz who thrives on creative challenges and thinking outside the box. Bringing a unique perspective to wxwx and xw. Enthusiastic about creating compelling experiences that engage and inspire.",
      skills: ["wxwx", "xw"],
      experience: [
        {
          title: "Creative Innovation Specialist",
          company: "Imagination Solutions Inc.",
          duration: "2020 - Present",
          achievements: [
            "Developed and implemented innovative wxwx strategies, resulting in a 20% increase in user engagement.",
            "Led cross-functional teams in the execution of xw projects, consistently delivering high-quality results on time and within budget."
          ]
        },
        {
          title: "Strategic Initiative Coordinator",
          company: "Visionary Enterprises",
          duration: "2018 - 2020",
          achievements: [
            "Spearheaded the implementation of xw initiatives, improving overall operational efficiency by 15%.",
            "Collaborated with diverse stakeholders to identify and implement wxwx solutions that addressed critical business challenges."
          ]
        }
      ],
      projects: [
        {
          name: "Innovative wxwx Platform",
          description: "A cutting-edge platform designed to enhance user experience and drive innovation in the xw sector.",
          technologies: ["wxwx", "xw"],
          github: ""
        },
        {
          name: "Dynamic xw Analytics Tool",
          description: "Developed a powerful analytics tool that leverages wxwx to provide actionable insights and improve decision-making.",
          technologies: ["xw"]
        }
      ]
    }
  };

  // Circular Progress Component
  const CircularProgress = ({ percentage = 75, skill }: { percentage?: number; skill: string }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    
    return (
      <div className="flex items-center mb-6">
        <div className="relative w-16 h-16 mr-4">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 68 68">
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />
            <circle
              cx="34"
              cy="34"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
        </div>
        <span className="text-gray-700 font-medium">{skill}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="relative bg-gray-50 pt-8 pb-16">
        {/* Decorative Green Elements */}
        <div className="absolute top-0 right-0 w-96 h-64 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500 rounded-full opacity-10"></div>
          <div className="absolute top-8 right-8 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
          <div className="absolute top-16 right-32">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-12 bg-green-500 opacity-60 transform rotate-12"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute top-8 right-8 w-32 h-32 bg-white rounded-full p-1 shadow-lg z-10">
          <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="px-8 pt-8">
          <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-widest uppercase">
            {resumeData.sections.header.name} SMITH
          </h1>
          <p className="text-gray-600 text-lg tracking-wide uppercase mb-6">
            {resumeData.sections.header.title}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>{resumeData.sections.header.contact.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>{resumeData.sections.header.contact.email}</span>
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              <span>123 Street, City</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-50 p-8">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="border-b border-gray-300 pb-2 mb-4">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                PROFILE
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {resumeData.sections.summary}
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <div className="border-b border-gray-300 pb-2 mb-4">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                EDUCATION
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">INSTITUTION</h3>
                <p className="text-gray-600 mb-1">2016-2019</p>
                <p className="text-gray-600">Qualification</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">INSTITUTION</h3>
                <p className="text-gray-600 mb-1">2016-2019</p>
                <p className="text-gray-600">Qualification</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">INSTITUTION</h3>
                <p className="text-gray-600 mb-1">2016-2019</p>
                <p className="text-gray-600">Qualification</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">INSTITUTION</h3>
                <p className="text-gray-600 mb-1">2016-2019</p>
                <p className="text-gray-600">Qualification</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                SKILLS
              </h2>
            </div>
            <div className="space-y-2">
              {resumeData.sections.skills.map((skill, index) => (
                <CircularProgress key={index} skill={skill.toUpperCase()} percentage={75 + (index * 10)} />
              ))}
              <CircularProgress skill="SKILL #3" percentage={85} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-8">
          {/* Work Experience Section */}
          <div className="mb-8">
            <div className="border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                WORK EXPERIENCE
              </h2>
            </div>

            <div className="space-y-8">
              {resumeData.sections.experience.map((job, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {job.title.toUpperCase()} / {job.company.toUpperCase()}
                    </h3>
                    <p className="text-gray-600 mb-3">{job.duration}</p>
                  </div>
                  <div className="space-y-2">
                    {job.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex">
                        <span className="text-gray-400 mr-3 font-bold">{achIndex + 1}.</span>
                        <p className="text-gray-600 text-sm leading-relaxed flex-1">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Additional placeholder experiences to match the design */}
              <div>
                <div className="mb-3">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    JOB TITLE / COMPANY
                  </h3>
                  <p className="text-gray-600 mb-3">2016-2019</p>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-400 mr-3 font-bold">3.</span>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 mr-3 font-bold">4.</span>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      Tellus in hac habitasse platea dictumst vestibulum. Turpis massa tincidunt dui ut ornare.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    JOB TITLE / COMPANY
                  </h3>
                  <p className="text-gray-600 mb-3">2016-2019</p>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-400 mr-3 font-bold">1.</span>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 mr-3 font-bold">2.</span>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      Tellus in hac habitasse platea dictumst vestibulum. Turpis massa tincidunt dui ut ornare.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mt-8">
            <div className="border-b border-gray-300 pb-2 mb-6">
              <h2 className="text-lg font-light text-gray-700 tracking-wide uppercase">
                PROJECTS
              </h2>
            </div>
            
            {resumeData.sections.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-bold text-gray-800 text-lg mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {tech}
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

export { MinimalistPro };