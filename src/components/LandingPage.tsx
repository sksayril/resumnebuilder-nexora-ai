import React, { useState, useEffect } from 'react';
import { FileText, Wand2, Star, Users, ChevronRight, Check, Menu, X, Sparkles, Zap, Target, Shield, Plus, Minus, Moon, Sun, Play } from 'lucide-react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { Helmet } from 'react-helmet-async';
import resumebuilderpreview from '/previewresumebuilder.jpg';
import logoresume from '/resumeailoogo.png';
import { useTheme } from '../context/ThemeContext';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { theme, toggleTheme } = useTheme();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>NexorAI - Professional Resume Builder with AI</title>
        <meta name="title" content="NexorAI - Professional Resume Builder with AI" />
        <meta name="description" content="Create professional resumes with our AI-powered resume builder. Get industry-specific suggestions, ATS optimization, and professional templates to land your dream job." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexorai.com/" />
        <meta property="og:title" content="NexorAI - Professional Resume Builder with AI" />
        <meta property="og:description" content="Create professional resumes with our AI-powered resume builder. Get industry-specific suggestions, ATS optimization, and professional templates to land your dream job." />
        <meta property="og:image" content={resumebuilderpreview} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nexorai.com/" />
        <meta property="twitter:title" content="NexorAI - Professional Resume Builder with AI" />
        <meta property="twitter:description" content="Create professional resumes with our AI-powered resume builder. Get industry-specific suggestions, ATS optimization, and professional templates to land your dream job." />
        <meta property="twitter:image" content={resumebuilderpreview} />

        {/* Additional Meta Tags */}
        <meta name="keywords" content="resume builder, AI resume, professional resume, ATS optimization, job application, career tools" />
        <meta name="author" content="NexorAI" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href={logoresume} />
        <link rel="apple-touch-icon" href={logoresume} />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://nexorai.com/" />
      </Helmet>

      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logoresume} 
              alt="nexorai Logo" 
                className="h-12 w-auto transform transition-transform duration-300 hover:scale-105"
            />
          </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <NavigationMenu.Root className="relative">
                <NavigationMenu.List className="flex items-center justify-center space-x-12">
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 text-base font-medium flex items-center gap-1 group hover:shadow-sm hover:bg-white/50 dark:hover:bg-gray-800/50 px-4 py-2 rounded-xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
                      Features
                      <ChevronRight className="w-4 h-4 transform transition-transform duration-200 group-hover:rotate-90" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 mt-2 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                      <div className="space-y-2">
                        <a href="#features" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <div className="font-medium">AI-Powered Content</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Smart suggestions</div>
                            </div>
                          </div>
                        </a>
                        <a href="#features" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium">Professional Templates</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Industry-specific</div>
                            </div>
                          </div>
                        </a>
                        <a href="#features" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium">ATS Optimization</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Pass screening</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>

                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 text-base font-medium flex items-center gap-1 group hover:shadow-sm hover:bg-white/50 dark:hover:bg-gray-800/50 px-4 py-2 rounded-xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
                      Pricing
                      <ChevronRight className="w-4 h-4 transform transition-transform duration-200 group-hover:rotate-90" />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 mt-2 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
                      <div className="space-y-2">
                        <a href="#pricing" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                              <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium">Free Plan</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Basic features</div>
                            </div>
                          </div>
                        </a>
                        <a href="#pricing" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                              <Wand2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <div className="font-medium">Pro Plan</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Advanced features</div>
                            </div>
                          </div>
                        </a>
                        <a href="#pricing" className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="font-medium">Enterprise</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Custom solutions</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>

                  <a href="#faq" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 text-base font-medium hover:shadow-sm hover:bg-white/50 dark:hover:bg-gray-800/50 px-4 py-2 rounded-xl border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
                    FAQ
                  </a>
                </NavigationMenu.List>
              </NavigationMenu.Root>
            </div>

            {/* Theme Toggle and Get Started Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:shadow-md"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                <a href='/resumeform'>
                Get Started
                </a>
                
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                  <Menu className="w-6 h-6" />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl p-6">
                  <div className="flex justify-between items-center mb-8">
                    <img 
                      src={logoresume} 
                      alt="nexorai Logo" 
                      className="h-10 w-auto"
                    />
                    <Dialog.Close asChild>
                      <button className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
                        <X className="w-6 h-6" />
                      </button>
                    </Dialog.Close>
          </div>
                  <div className="space-y-4">
                    <a href="#features" className="block px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                      Features
                    </a>
                    <a href="#pricing" className="block px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                      Pricing
                    </a>
                    <a href="#faq" className="block px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300">
                      FAQ
                    </a>
                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="w-5 h-5 mr-2" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5 mr-2" />
                          Dark Mode
                        </>
                      )}
                    </button>
          <button
            onClick={onGetStarted}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            Get Started
          </button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-20">
      {/* Hero Section */}
      <div 
        className={`container mx-auto px-4 py-16 transition-opacity duration-1000 ${isVisible.hero ? 'opacity-100' : 'opacity-0'}`}
        id="hero"
      >
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative text-center max-w-5xl mx-auto">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Create Your Professional 
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"> Resume</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 -z-10"></span>
              </span>
              <br />with AI
          </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your career journey into a compelling story with our AI-powered resume builder. Stand out from the crowd with professionally crafted content.
          </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onGetStarted}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
              >
                
                <a href='/resumeform'>
                <span className="relative z-10">Get Started</span>
                </a>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group flex items-center gap-2 px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
                <Play className="w-5 h-5 text-indigo-500" />
                <span className="text-lg font-medium">Watch Demo</span>
          </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-12">
              {[
                { label: 'Active Users', value: '10K+' },
                { label: 'Resumes Created', value: '50K+' },
                { label: 'Success Rate', value: '95%' },
                { label: 'Job Placements', value: '25K+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Preview Image */}
            <div className="relative group">
              {/* Decorative gradient orbs */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-delayed"></div>
              
              {/* Image container with enhanced shadow and border */}
              <div className="relative">
            <img
              src={resumebuilderpreview}
              alt="Resume Builder Preview"
                  className="rounded-3xl shadow-2xl max-w-full md:max-w-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-indigo-500/25 border border-white/10 backdrop-blur-sm dark:border-gray-700/50"
            />
                
                {/* Shine effect overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div 
        className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-32 transition-opacity duration-1000 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}
        id="features"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-7xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create a standout resume that gets you noticed
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50">
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Professional Templates</h3>
                <p className="text-gray-400 text-lg">
                  Choose from our collection of professionally designed templates that highlight your unique skills and experience.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>

            <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50">
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/20">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">AI-Powered Content</h3>
                <p className="text-gray-400 text-lg">
                  Let our AI help you craft compelling content that showcases your professional journey effectively.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>

            <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50">
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">ATS Optimization</h3>
                <p className="text-gray-400 text-lg">
                  Ensure your resume passes through Applicant Tracking Systems with our keyword optimization technology.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>

            <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50">
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/20">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Industry Tailored</h3>
                <p className="text-gray-400 text-lg">
                  Get industry-specific suggestions that align with what hiring managers in your field are looking for.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
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
        className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-32 transition-opacity duration-1000 ${isVisible.pricing ? 'opacity-100' : 'opacity-0'}`}
        id="pricing"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-7xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto">
              Select the perfect plan to accelerate your career journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Free Plan */}
            <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50">
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">Free</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">$0</span>
                    <span className="text-xl text-gray-400 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">1 resume template</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">Basic AI suggestions</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">PDF export</span>
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500/80 hover:to-indigo-500/80 transition-all duration-300 border border-gray-600/50 hover:border-blue-400/50 group-hover:shadow-lg group-hover:shadow-blue-500/20"
              >
                Get Started
              </button>
            </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>

            {/* Pro Plan */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-indigo-500/30 transform scale-105">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-1 px-4 rounded-bl-lg text-sm font-medium">
                Popular
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">Pro</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">$9.99</span>
                    <span className="text-xl text-gray-300 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">10 premium templates</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">Advanced AI suggestions</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">All export formats</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">ATS optimization</span>
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Choose Pro
              </button>
            </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>

            {/* Enterprise Plan */}
            <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-700/50">
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white mb-2">Enterprise</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">$24.99</span>
                    <span className="text-xl text-gray-400 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">All Pro features</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">20+ premium templates</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">Priority support</span>
                </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-lg">Multiple resume profiles</span>
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-500/80 hover:to-teal-500/80 transition-all duration-300 border border-gray-600/50 hover:border-emerald-400/50 group-hover:shadow-lg group-hover:shadow-emerald-500/20"
              >
                Choose Enterprise
              </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-500 to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div 
        className={`bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-32 transition-opacity duration-1000 ${isVisible.faq ? 'opacity-100' : 'opacity-0'}`}
        id="faq"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-7xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about our AI-powered resume builder
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion.Root
              type="single"
              collapsible
              className="space-y-4"
            >
            {faqs.map((faq, index) => (
                <Accordion.Item
                key={index} 
                  value={`item-${index}`}
                  className="group"
                >
                  <Accordion.Trigger className="w-full text-left p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 flex justify-between items-center focus:outline-none shadow-sm hover:shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-all duration-500">
                      <div className="relative w-5 h-5">
                        <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300 absolute inset-0 transform transition-all duration-500 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" />
                        <Minus className="w-5 h-5 text-gray-600 dark:text-gray-300 absolute inset-0 transform transition-all duration-500 opacity-0 rotate-90 group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0" />
                </div>
              </div>
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl border-t border-gray-100 dark:border-gray-600">
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed animate-text-reveal">
                        {faq.answer}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-900 py-16 rounded-t-3xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-7xl font-bold text-white mb-6">Ready to Build Your Professional Resume?</h2>
          <p className="text-3xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs using our AI-powered resume builder.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-black text-white px-8 py-3 rounded-3xl text-lg font-semibold transition-colors transform hover:scale-105 transition-transform duration-300"
          >
            <a href='/resumeform'>
            Get Started Now
            </a>
            
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <img 
                src={logoresume} 
                alt="nexorai Logo" 
                className="h-12 w-auto"
              />
              <p className="text-gray-400 text-2xl leading-relaxed">
                Transform your career journey with our AI-powered resume builder. Create professional resumes that stand out.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-3xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Features</a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Pricing</a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">FAQ</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Blog</a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white text-3xl font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Help Center</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">API Reference</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-lg">Community</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white  text-3xl font-semibold mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:support@nexorai.com" className="hover:text-white transition-colors duration-300 text-lg">support@nexorai.com</a>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+1234567890" className="hover:text-white transition-colors duration-300 text-lg">+1 (234) 567-890</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-base">
                © 2025 nexorai. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-base transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}