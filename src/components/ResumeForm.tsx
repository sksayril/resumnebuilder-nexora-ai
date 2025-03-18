import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UserData } from '../types';
import { Upload, X, ArrowLeft, Plus, Check } from 'lucide-react';

interface ResumeFormProps {
  onSubmit: (data: UserData) => void;
  onBack: () => void;
}

export function ResumeForm({ onSubmit, onBack }: ResumeFormProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    description: '',
    skills: [],
    skillLevels: {},
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [summaryPreset, setSummaryPreset] = useState('');
  const totalSteps = 3;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFormData(prev => ({ ...prev, photo: acceptedFiles[0] }));
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const removePhoto = () => {
    setFormData(prev => {
      const newData = { ...prev };
      delete newData.photo;
      return newData;
    });
  };

  const nextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill],
        skillLevels: {
          ...prev.skillLevels,
          [newSkill]: 'Intermediate'
        }
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => {
      const newSkillLevels = {...prev.skillLevels};
      delete newSkillLevels[skillToRemove];
      
      return {
        ...prev,
        skills: prev.skills.filter(skill => skill !== skillToRemove),
        skillLevels: newSkillLevels
      };
    });
  };

  const updateSkillLevel = (skill: string, level: string) => {
    setFormData(prev => ({
      ...prev,
      skillLevels: {
        ...prev.skillLevels,
        [skill]: level
      }
    }));
  };

  const applySummaryTemplate = (template: string) => {
    setSummaryPreset(template);
    let personalizedSummary = '';
    
    switch(template) {
      case 'professional':
        personalizedSummary = `${formData.title} with extensive experience in developing innovative solutions and driving results. Skilled in ${formData.skills.slice(0, 3).join(', ')}${formData.skills.length > 3 ? ' and more' : ''}. Dedicated to delivering high-quality work with attention to detail and commitment to excellence.`;
        break;
      case 'creative':
        personalizedSummary = `Passionate ${formData.title} who thrives on creative challenges and thinking outside the box. Bringing a unique perspective to ${formData.skills.slice(0, 2).join(' and ')}${formData.skills.length > 2 ? ' among other skills' : ''}. Enthusiastic about creating compelling experiences that engage and inspire.`;
        break;
      case 'technical':
        personalizedSummary = `Results-driven ${formData.title} with proven expertise in ${formData.skills.slice(0, 3).join(', ')}${formData.skills.length > 3 ? ' and related technologies' : ''}. Committed to implementing best practices, optimizing performance, and solving complex problems with efficient, scalable solutions.`;
        break;
      default:
        personalizedSummary = formData.description;
    }
    
    setFormData(prev => ({
      ...prev,
      description: personalizedSummary
    }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
        <div className="flex items-center">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-indigo-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-2xl font-bold ml-4">Create Your Professional Resume</h1>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`flex items-center justify-center rounded-full w-10 h-10 ${
                    index + 1 === activeStep 
                      ? 'bg-white text-indigo-600' 
                      : index + 1 < activeStep 
                        ? 'bg-indigo-300 text-indigo-800' 
                        : 'bg-indigo-800 text-indigo-200'
                  }`}
                >
                  {index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div className={`h-1 w-full ${index + 1 < activeStep ? 'bg-indigo-300' : 'bg-indigo-800'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div>Personal Info</div>
            <div>Skills & Summary</div>
            <div>Preview & Finalize</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {activeStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            
            <div className="flex items-start gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                {formData.photo ? (
                  <div className="relative w-40 h-40">
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-sm transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-10 h-10 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2 text-center">Upload your photo</p>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                      placeholder="Frontend Developer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                    placeholder="New York, NY"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-medium text-gray-800 mb-4">Add Your Skills</h3>
              
              <div className="flex mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                  placeholder="Add a skill (e.g. JavaScript, Project Management)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              {formData.skills.length > 0 ? (
                <div className="space-y-3">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                      <div className="flex-1">
                        <div className="font-medium">{skill}</div>
                        <div className="mt-1">
                          <select
                            value={formData.skillLevels[skill] || 'Intermediate'}
                            onChange={(e) => updateSkillLevel(skill, e.target.value)}
                            className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>No skills added yet. Add your key skills to strengthen your resume.</p>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Summary</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose a Summary Style (Optional)</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className={`p-3 border rounded-md text-sm flex flex-col items-center justify-center gap-2 ${
                    summaryPreset === 'professional' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => applySummaryTemplate('professional')}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    {summaryPreset === 'professional' ? <Check size={16} className="text-indigo-600" /> : null}
                  </div>
                  <span>Professional</span>
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded-md text-sm flex flex-col items-center justify-center gap-2 ${
                    summaryPreset === 'creative' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => applySummaryTemplate('creative')}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    {summaryPreset === 'creative' ? <Check size={16} className="text-indigo-600" /> : null}
                  </div>
                  <span>Creative</span>
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded-md text-sm flex flex-col items-center justify-center gap-2 ${
                    summaryPreset === 'technical' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => applySummaryTemplate('technical')}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    {summaryPreset === 'technical' ? <Check size={16} className="text-indigo-600" /> : null}
                  </div>
                  <span>Technical</span>
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">Select a template to generate a professional summary automatically based on your skills</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={8}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                placeholder="Experienced developer with 5+ years of experience in building responsive web applications..."
              />
              <p className="mt-2 text-sm text-gray-500">Write a compelling summary that highlights your expertise, experience, and what makes you unique.</p>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resume Preview</h2>
            
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-indigo-600 mb-1">Personal Information</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.name || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="font-medium">{formData.title || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{formData.location || '—'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-indigo-600 mb-1">Contact Details</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{formData.phone || '—'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-indigo-600 mb-1">Professional Summary</h4>
                  <p className="text-sm text-gray-700 border border-indigo-100 bg-white p-2 rounded">
                    {formData.description || '— No summary provided —'}
                  </p>
                </div>
                
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-indigo-600 mb-1">Skills ({formData.skills.length})</h4>
                  {formData.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-white border border-indigo-200 rounded-full px-3 py-1 text-sm">
                          <span>{skill}</span>
                          <span className="ml-1 text-xs text-indigo-600">({formData.skillLevels[skill] || 'Intermediate'})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">— No skills added —</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Previous
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          )}

          {activeStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Generate Resume
            </button>
          )}
        </div>
      </form>
    </div>
  );
}