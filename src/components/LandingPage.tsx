import React, { useState, useEffect } from 'react';
import { FileText, Wand2, Star, Users, ChevronRight, Check } from 'lucide-react';
import resumebuilderpreview from '/previewresumebuilder.jpg';
import logoresume from '/resumeailoogo.png';
interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    testimonials: false,
    pricing: false,
    faq: false
  });

  useEffect(() => {
    setIsVisible({
      hero: true,
      features: true,
      testimonials: true,
      pricing: true,
      faq: true
    });
  }, []);

  // const [activeTestimonial, setActiveTestimonial] = useState(0);
  // const testimonials = [
  //   {
  //     name: "Sarah Johnson",
  //     role: "Software Engineer",
  //     content: "This AI resume builder helped me land interviews at top tech companies. The suggestions were tailored to my industry perfectly.",
  //     avatar: "/api/placeholder/48/48"
  //   },
  //   {
  //     name: "Michael Chen",
  //     role: "Marketing Executive",
  //     content: "I was struggling to highlight my accomplishments effectively. This tool transformed my resume and I received three job offers within a month!",
  //     avatar: "/api/placeholder/48/48"
  //   },
  //   {
  //     name: "Priya Patel",
  //     role: "Recent Graduate",
  //     content: "As someone just entering the job market, I wasn't sure how to present my limited experience. The AI suggestions made my resume stand out despite being a new graduate.",
  //     avatar: "/api/placeholder/48/48"
  //   }
  // ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI resume builder work?",
      answer: "Our AI analyzes your career information and creates optimized content based on industry best practices and recruiter preferences. It suggests impactful bullet points, keywords, and formatting to make your resume stand out."
    },
    {
      question: "Can I export my resume to different formats?",
      answer: "Yes! You can export your finished resume as a PDF, Word document, or plain text file. We also offer ATS-friendly formatting to ensure your resume passes through applicant tracking systems."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and don't share your information with third parties. Your career data is only used to generate your resume content."
    },
    {
      question: "How much does it cost?",
      answer: "We offer a free tier with basic features, and premium plans starting at $9.99/month with advanced AI suggestions, unlimited exports, and more template options."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation with Logo */}
      <nav className="py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={logoresume} 
              alt="nexorai Logo" 
              className="h-10 mr-3"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</a>
          </div>
          <button
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className={`container mx-auto px-4 py-16 transition-opacity duration-1000 ${isVisible.hero ? 'opacity-100' : 'opacity-0'}`}
        id="hero"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Professional Resume with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your career journey into a compelling story with our AI-powered resume builder
          </p>
          <button
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors transform hover:scale-105 transition-transform duration-300"
          >
            Get Started
          </button>
          <div className="mt-8 flex justify-center">
            <img
              src={resumebuilderpreview}
              alt="Resume Builder Preview"
              className="rounded-lg shadow-xl max-w-full md:max-w-2xl animate-pulse"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div 
        className={`bg-white py-16 transition-opacity duration-1000 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}
        id="features"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-semibold ml-3">Professional Templates</h3>
              </div>
              <p className="text-gray-600">
                Choose from our collection of professionally designed templates that highlight your unique skills and experience.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Wand2 className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-semibold ml-3">AI-Powered Content</h3>
              </div>
              <p className="text-gray-600">
                Let our AI help you craft compelling content that showcases your professional journey effectively.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-semibold ml-3">ATS Optimization</h3>
              </div>
              <p className="text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems with our keyword optimization technology.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-semibold ml-3">Industry Tailored</h3>
              </div>
              <p className="text-gray-600">
                Get industry-specific suggestions that align with what hiring managers in your field are looking for.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {/* <div 
        className={`py-16 transition-opacity duration-1000 ${isVisible.testimonials ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <div className="relative h-64">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                    index === activeTestimonial 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-8'
                  }`}
                >
                  <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeTestimonial ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Pricing Section */}
      <div 
        className={`bg-indigo-50 py-16 transition-opacity duration-1000 ${isVisible.pricing ? 'opacity-100' : 'opacity-0'}`}
        id="pricing"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-500 font-normal">/month</span></p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>1 resume template</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Basic AI suggestions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>PDF export</span>
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full bg-gray-100 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Started
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-indigo-500 transform scale-105 hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white py-1 px-4 rounded-bl-lg">Popular</div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg text-gray-500 font-normal">/month</span></p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>10 premium templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Advanced AI suggestions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>All export formats</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>ATS optimization</span>
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Choose Pro
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-6">$24.99<span className="text-lg text-gray-500 font-normal">/month</span></p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>All Pro features</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>20+ premium templates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Multiple resume profiles</span>
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full bg-gray-100 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Choose Enterprise
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div 
        className={`py-16 transition-opacity duration-1000 ${isVisible.faq ? 'opacity-100' : 'opacity-0'}`}
        id="faq"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                >
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <ChevronRight 
                    className={`w-5 h-5 transform transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-40 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Build Your Professional Resume?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs using our AI-powered resume builder.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors transform hover:scale-105 transition-transform duration-300"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-4 md:mb-0">
              © 2025 nexorai. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}