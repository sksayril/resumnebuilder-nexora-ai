import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserData, GeneratedResume, ResumeData } from '../types';

const genAI = new GoogleGenerativeAI('AIzaSyB9oQ2ibthHs30PLjqopWkRasjMiqhmN1Q');

export async function generateResume(userData: UserData, template: string): Promise<GeneratedResume> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
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
          "summary": "professional summary here",
          "skills": ["skill1", "skill2"],
          "experience": [
            {
              "title": "Job Title",
              "company": "Company Name",
              "duration": "Date Range",
              "achievements": ["achievement1", "achievement2"]
            }
          ],
          "projects": [
            {
              "name": "Project Name",
              "description": "Project description",
              "technologies": ["tech1", "tech2"],
              "github": "project github link if available"
            }
          ]
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json\n|\n```/g, '').trim();
    const content = JSON.parse(cleanJson) as ResumeData;
    
    return {
      content,
      template
    };
  } catch (error: any) {
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      throw new Error('API rate limit reached. Please try again in a few minutes or use a different API key.');
    }
    console.error('Error generating resume:', error);
    throw new Error('Failed to generate resume. Please check your input and try again.');
  }
}