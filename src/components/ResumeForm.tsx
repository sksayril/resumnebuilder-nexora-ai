import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { UserData } from '../types';
import { Upload, X, ArrowLeft, Plus, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});
  const totalSteps = 3;
  const [progress, setProgress] = useState(0);

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
    
    // Validate required fields
    if (!formData.name || !formData.title || !formData.email || !formData.phone || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate skills
    if (formData.skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }
    
    // Validate description
    if (!formData.description) {
      alert('Please provide a professional summary');
      return;
    }

    // If all validations pass, submit the form
    onSubmit(formData);
  };

  const removePhoto = () => {
    setFormData(prev => {
      const newData = { ...prev };
      delete newData.photo;
      return newData;
    });
  };

  const validateEmail = (email: string) => {
    // More strict email validation regex
    // This checks for:
    // 1. Username can't start or end with dots or special chars
    // 2. Domain must have proper format (no consecutive dots or commas)
    // 3. TLD must be at least 2 characters and contain only letters
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-](?![._-]))*[a-zA-Z0-9]@[a-zA-Z0-9]([a-zA-Z0-9-](?![.-]))*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    
    // Additional checks for common mistakes
    if (email.includes(',')) {
      return false; // No commas allowed
    }
    
    if (email.split('@').length !== 2) {
      return false; // Must contain exactly one @ symbol
    }
    
    const [local, domain] = email.split('@');
    if (!local || !domain) {
      return false; // Both parts must exist
    }
    
    if (!domain.includes('.')) {
      return false; // Domain must have at least one dot
    }
    
    const tld = domain.split('.').pop();
    if (!tld || tld.length < 2) {
      return false; // TLD must be at least 2 chars
    }
    
    // Finally, run the regex test
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Remove any non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };

  const validateStep1 = () => {
    const newErrors: {email?: string; phone?: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
    }
    
    setErrors(newErrors);
    
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '').substring(0, 10);
    
    // Format the phone number as (XXX) XXX-XXXX
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    } else if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedPhone }));
    
    // Clear phone error if it becomes valid
    if (validatePhone(formattedPhone)) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    } else {
      setErrors(prev => ({ 
        ...prev, 
        phone: formattedPhone ? 'Phone number must be 10 digits' : 'Phone number is required'
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData(prev => ({ ...prev, email: email }));
    
    // Clear email error if it becomes valid
    if (validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: undefined }));
    } else {
      setErrors(prev => ({ 
        ...prev, 
        email: email ? 'Please enter a valid email address' : 'Email address is required'
      }));
    }
  };

  const nextStep = () => {
    if (activeStep === 1) {
      // Validate before proceeding to next step
      if (validateStep1()) {
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep < totalSteps) {
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

  // Calculate form completion percentage
  const calculateProgress = () => {
    let totalFields = 0;
    let completedFields = 0;

    // Personal Information (Step 1)
    if (formData.name) completedFields++;
    if (formData.title) completedFields++;
    if (formData.email && !errors.email) completedFields++;
    if (formData.phone && !errors.phone) completedFields++;
    if (formData.location) completedFields++;
    totalFields += 5;

    // Skills & Summary (Step 2)
    if (formData.skills.length > 0) completedFields++;
    if (formData.description) completedFields++;
    totalFields += 2;

    // Calculate percentage
    const percentage = Math.round((completedFields / totalFields) * 100);
    setProgress(percentage);
  };

  // Update progress whenever form data changes
  useEffect(() => {
    calculateProgress();
  }, [formData, errors]);

  // Run validation when form data changes
  useEffect(() => {
    if (formData.email && !validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: 'Phone number must be 10 digits' }));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 py-8 relative overflow-hidden">
      {/* Add subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      {/* Add subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 blur-3xl"></div>
      
      <Card className="w-full max-w-3xl shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl relative z-10">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-3xl p-8 text-white shadow-md">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-indigo-700/30">
              <ArrowLeft size={20} />
            </Button>
            <CardTitle className="text-2xl font-bold ml-4 font-serif tracking-wide">Create Your Professional Resume</CardTitle>
          </div>
          <div className="mt-6">
            <div className="w-full bg-indigo-800 rounded-full h-2.5">
              <div 
                className="bg-white h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <div>Form Progress: {progress}%</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {activeStep === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="relative">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 font-serif tracking-wide relative">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Personal Information
                    </span>
                    <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
                  </h2>
                </div>
                <div className="flex items-start gap-8 flex-col md:flex-row">
                  <div>
                    <Label className="mb-2 font-medium text-gray-700 dark:text-gray-300">Profile Photo</Label>
                    {formData.photo ? (
                      <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative w-40 h-40"
                      >
                        <img
                          src={URL.createObjectURL(formData.photo)}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-xl shadow-lg border-4 border-indigo-100"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={removePhoto}
                          className="absolute -top-2 -right-2 shadow-md"
                        >
                          <X size={16} />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        {...getRootProps()}
                        className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                      >
                        <input {...getInputProps()} />
                        <Upload className="w-10 h-10 text-gray-400" />
                        <p className="text-sm text-gray-500 mt-2 text-center">Upload your photo</p>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Label htmlFor="name" className="font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Doe"
                          className="mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-300">Professional Title</Label>
                        <Input
                          id="title"
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Frontend Developer"
                          className="mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300">Email Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleEmailChange}
                          placeholder="john.doe@example.com"
                          className={cn(
                            "mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500",
                            errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                          )}
                          required
                        />
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">Format: username@domain.com</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Label htmlFor="phone" className="font-medium text-gray-700 dark:text-gray-300">Phone Number <span className="text-red-500">*</span></Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="(123) 456-7890"
                          className={cn(
                            "mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500",
                            errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                          )}
                          required
                        />
                        {errors.phone && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {errors.phone}
                          </motion.p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">Must be 10 digits</p>
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Label htmlFor="location" className="font-medium text-gray-700 dark:text-gray-300">Location</Label>
                      <Input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="New York, NY"
                        className="mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      />
                    </motion.div>
                  </div>
                </div>
                {(errors.email || errors.phone) && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-md"
                  >
                    <h3 className="text-sm font-medium text-red-800 mb-1">Please fix the following errors:</h3>
                    <ul className="text-sm text-red-700 list-disc ml-5">
                      {errors.email && <li>{errors.email}</li>}
                      {errors.phone && <li>{errors.phone}</li>}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
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
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
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
                <Button variant="outline" size="lg" onClick={prevStep} className="text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                  Previous
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={onBack} className="text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                  Cancel
                </Button>
              )}

              {activeStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className={`text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    activeStep === 1 && (!formData.email || !formData.phone || errors.email || errors.phone)
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                  }`}
                  disabled={activeStep === 1 && (!formData.email || !formData.phone || errors.email || errors.phone)}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  Generate Resume
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}