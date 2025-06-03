export interface UserData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  skills: string[];
  skillLevels: Record<string, string>;
  photo?: File;
  github?: string;
  linkedin?: string;
  logo?: File;
}

export interface ResumeData {
  sections: {
    header: {
      name: string;
      title: string;
      contact: {
        email: string;
        phone: string;
        location: string;
        github?: string;
        linkedin?: string;
      }
    };
    summary: string;
    skills: string[];
    experience: {
      title: string;
      company: string;
      duration: string;
      achievements: string[];
    }[];
    projects: {
      name: string;
      description: string;
      technologies: string[];
      link?: string;
      github?: string;
    }[];
  }
}

export interface GeneratedResume {
  content: ResumeData;
  template: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  color: string;
  description: string;
}

export interface EditableField {
  type: 'text' | 'textarea' | 'array';
  value: string | string[];
  onChange: (value: string | string[]) => void;
}