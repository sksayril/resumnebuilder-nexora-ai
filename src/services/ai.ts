import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserData, GeneratedResume, ResumeData } from '../types';

const genAI = new GoogleGenerativeAI('AIzaSyB05J_Fh62mo2U30N_Ucm79jToRTYhT4zo');

export async function generateResume(userData: UserData, template: string): Promise<GeneratedResume> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
      Create a professional resume based on the following information:
      
      Name: ${userData.name}
      Title: ${userData.title}
      Email: ${userData.email}
      Phone: ${userData.phone}
      Location: ${userData.location}
      Description: ${userData.description}
      Skills: ${userData.skills.join(', ')}
      GitHub: ${userData.github || 'Not provided'}
      LinkedIn: ${userData.linkedin || 'Not provided'}
      
      Generate a resume with the following sections:
      1. A professional summary based on the description
      2. 2-3 relevant work experiences that align with the skills and description
      3. 2-3 significant projects with GitHub links (if GitHub profile provided)
      4. Organized skills list
      
      Return ONLY a JSON object with this exact structure, no markdown formatting or backticks:
      {
        "sections": {
          "header": {
            "name": "${userData.name}",
            "title": "${userData.title}",
            "contact": {
              "email": "${userData.email}",
              "phone": "${userData.phone}",
              "location": "${userData.location}",
              "github": "${userData.github || ''}",
              "linkedin": "${userData.linkedin || ''}"
            }
          },
          "summary": "Professional summary here",
          "skills": ["Skill 1", "Skill 2", "Skill 3"],
          "experience": [
            {
              "title": "Job Title",
              "company": "Company Name",
              "duration": "Duration",
              "achievements": ["Achievement 1", "Achievement 2"]
            }
          ],
          "projects": [
            {
              "name": "Project Name",
              "description": "Project description",
              "technologies": ["Tech 1", "Tech 2"]
            }
          ]
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text
    const cleanText = text
      .replace(/```json\n?/g, '') // Remove JSON code block markers
      .replace(/```\n?/g, '')     // Remove any remaining code block markers
      .trim();                    // Remove extra whitespace
    
    // Parse the response and ensure it's a valid JSON
    let resumeData: ResumeData;
    try {
      resumeData = JSON.parse(cleanText);
      
      // Validate the required structure
      if (!resumeData.sections || !resumeData.sections.header) {
        throw new Error('Invalid resume structure');
      }
    } catch (error) {
      // Create a fallback resume structure
      resumeData = {
        sections: {
          header: {
            name: userData.name,
            title: userData.title,
            contact: {
              email: userData.email,
              phone: userData.phone,
              location: userData.location,
              github: userData.github || '',
              linkedin: userData.linkedin || ''
            }
          },
          summary: userData.description,
          skills: userData.skills,
          experience: [
            {
              title: "Professional Experience",
              company: "Company Name",
              duration: "Duration",
              achievements: ["Key achievement 1", "Key achievement 2"]
            }
          ],
          projects: [
            {
              name: "Project Name",
              description: "Project description",
              technologies: userData.skills.slice(0, 3)
            }
          ]
        }
      };
    }

    // Create the final resume object with the template ID
    const generatedResume: GeneratedResume = {
      content: resumeData,
      template: template.toLowerCase() // Ensure template ID is lowercase
    };

    return generatedResume;
  } catch (error) {
    throw new Error('Failed to generate resume. Please try again.');
  }
}