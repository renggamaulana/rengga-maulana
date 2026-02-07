"use client"

import Image from "next/image";
import { useEffect, useRef } from 'react';
import daphone from '../../assets/images/homepage.png'
import atmosight from '../../assets/images/atmosight.png'
import everydayQuotes from '../../assets/images/everyday-quotes.png'
import suzuNihongo from '../../assets/images/suzu-nihongo.png'
import restfulApi from '../../assets/images/restful-api.png'
import chatGpt from '../../assets/images/chatgpt.png'
import docker from '../../assets/images/docker.png'
import notion from '../../assets/images/notion.png'
import github from '../../assets/images/github.png'
import pitch from '../../assets/images/pitch.png'
import postman from '../../assets/images/postman.png'
import profile  from '../../assets/images/profile.jpeg'
import simpleMind  from '../../assets/images/simple-mind.png'
import fox from '../../assets/images/fox.png'
import TypedText from "@/components/TypedText";
import rillbite from '../../assets/images/rillbite-mockup.png'
import katalisDev from '../../assets/images/katalis-dev.png'
import SocialMedia from "@/components/SocialMedia";


export default function Homepage() {
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        });

        sectionsRef.current.forEach((el) => {
            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            if (sectionsRef.current) {
                sectionsRef.current.forEach((el) => {
                    if(el) {
                        observer.unobserve(el)
                    }
                });
            }
        };
    }, []);

    const projects = [
        {
            name: 'Rillbite',
            description: 'A comprehensive recipe application helping users maintain healthier lifestyles through curated meal planning and nutritional guidance.',
            stacks: ['Next.js', 'TypeScript', 'Tailwind CSS'],
            image: rillbite,
            link: 'https://rillbite.vercel.app/',
            category: 'Web Application'
        },
        {
            name: 'Katalis Dev',
            description: 'Modern company profile showcasing digital agency services including web development, mobile apps, and UI/UX design.',
            stacks: ['Vue.js', 'JavaScript', 'Tailwind CSS'],
            image: katalisDev,
            link: 'https://katalisdev.com/',
            category: 'Corporate Website'
        },
        {
            name: 'Daphone',
            description: 'E-commerce platform facilitating secondhand gadget sales and trade-ins across the Jabodetabek region.',
            stacks: ['Laravel', 'Vite', 'Tailwind CSS'],
            image: daphone,
            link: 'https://daphone.vercel.app/',
            category: 'E-Commerce'
        },
        {
            name: 'Atmosight',
            description: 'Real-time weather forecasting application delivering accurate meteorological data with an intuitive interface.',
            stacks: ['Next.js', 'Tailwind CSS', 'OpenWeather API'],
            image: atmosight,
            link: 'https://atmosight.vercel.app/',
            category: 'API Integration'
        },
    ]

    const skills = [
        {
            category: 'Frontend',
            items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS']
        },
        {
            category: 'Backend',
            items: ['Node.js', 'Laravel', 'RESTful APIs', 'Database Design']
        },
        {
            category: 'Tools & DevOps',
            items: ['Git', 'Docker', 'CI/CD', 'Postman', 'GitHub Actions']
        }
    ]

    const tools = {
        development: [
            { name: 'GitHub', description: 'Version control & collaboration', image: github, url: 'https://github.com', featured: true },
            { name: 'Postman', description: 'API development & testing', image: postman, url: 'https://postman.com' },
            { name: 'Docker', description: 'Containerization platform', image: docker, url: 'https://docker.com' },
            { name: 'ChatGPT', description: 'AI-powered development assistant', image: chatGpt, url: 'https://chatgpt.com' },
        ],
        productivity: [
            { name: 'Notion', description: 'Project documentation', image: notion, url: 'https://notion.so' },
            { name: 'Pitch', description: 'Presentation design', image: pitch, url: 'https://pitch.com' },
            { name: 'Simple Mind', description: 'Mind mapping & ideation', image: simpleMind, url: 'https://simplemind.eu' },
        ]
    }

    return(
        <div className="min-h-screen">
            {/* Hero Section */}
            <section 
                ref={(el) => {sectionsRef.current[0] = el}} 
                className="hidden-section relative min-h-screen flex items-center justify-center px-5 py-20 overflow-hidden"
                id="profile"
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"></div>
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200 dark:bg-sky-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center space-y-8">
                        {/* Avatar */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                                <Image 
                                    src={fox} 
                                    alt='Rengga Maulana' 
                                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-neutral-800 shadow-2xl"
                                />
                            </div>
                        </div>

                        {/* Name & Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent">
                                Rengga Maulana
                            </h1>
                            
                            <div className="h-12 md:h-16">
                                <p className="text-xl md:text-3xl font-semibold text-sky-600 dark:text-sky-400">
                                    <TypedText
                                        strings={[
                                            "Fullstack Engineer",
                                            "QA Automation",
                                            "Tech Enthusiast"
                                        ]}
                                        typeSpeed={50}
                                        backSpeed={30}
                                        loop={true}
                                    />
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                            Crafting <span className="font-bold text-sky-600 dark:text-sky-400">scalable</span> and{' '}
                            <span className="font-bold text-sky-600 dark:text-sky-400">efficient</span> web solutions
                            with modern technologies and best practices
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Laravel', 'Tailwind CSS'].map((skill) => (
                                <span 
                                    key={skill}
                                    className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 pt-8">
                            <a 
                                href="#projects" 
                                className="group px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                            >
                                View Projects
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a 
                                href="https://drive.google.com/file/d/190WQcXYJDfb08W8uEm1MecsWbZs1zhpj/view" 
                                target="_blank"
                                className="px-8 py-4 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border-2 border-neutral-900 dark:border-white rounded-xl font-semibold hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-200 hover:-translate-y-1"
                            >
                                Download Resume
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className="pt-8">
                            <SocialMedia pathname="" />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Projects Section */}
            <section 
                ref={(el) => {sectionsRef.current[1] = el}} 
                className="hidden-section py-20 px-5 bg-white dark:bg-neutral-900"
                id="projects"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="mb-16 text-center">
                        <div className="inline-block">
                            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                                Featured Projects
                            </h2>
                            <div className="h-1.5 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full"></div>
                        </div>
                        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            A selection of my recent work showcasing expertise in modern web technologies
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <a
                                key={project.name}
                                href={project.link}
                                target="_blank"
                                className="group relative bg-neutral-50 dark:bg-neutral-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Project Image */}
                                <div className="relative h-64 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                                    <Image 
                                        src={project.image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        alt={project.name}
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white dark:bg-neutral-900 bg-opacity-90 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                            {project.category}
                                        </span>
                                    </div>
                                    {/* External Link Icon */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="p-2 bg-white dark:bg-neutral-900 rounded-full">
                                            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.stacks.map((stack) => (
                                            <span 
                                                key={stack}
                                                className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-lg text-sm font-medium"
                                            >
                                                {stack}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 px-5 bg-neutral-50 dark:bg-neutral-950">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <div className="inline-block">
                            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                                Technical Expertise
                            </h2>
                            <div className="h-1.5 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {skills.map((skillGroup) => (
                            <div 
                                key={skillGroup.category}
                                className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-gradient-to-b from-sky-600 to-blue-600 rounded-full"></div>
                                    {skillGroup.category}
                                </h3>
                                <ul className="space-y-3">
                                    {skillGroup.items.map((skill) => (
                                        <li 
                                            key={skill}
                                            className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300"
                                        >
                                            <svg className="w-5 h-5 text-sky-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section 
                ref={(el) => {sectionsRef.current[2] = el}} 
                className="hidden-section py-20 px-5 bg-white dark:bg-neutral-900"
                id="stack"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <div className="inline-block">
                            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                                Tools & Technologies
                            </h2>
                            <div className="h-1.5 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full"></div>
                        </div>
                        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                            My development and productivity toolkit
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Development Tools */}
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                                Development
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tools.development.map((tool) => (
                                    <a
                                        key={tool.name}
                                        href={tool.url}
                                        target="_blank"
                                        className="group flex items-center gap-4 p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 border border-neutral-200 dark:border-neutral-700 hover:border-sky-600 dark:hover:border-sky-600 transition-all duration-200 hover:shadow-lg"
                                    >
                                        <Image 
                                            src={tool.image} 
                                            className="w-12 h-12 rounded-lg flex-shrink-0" 
                                            alt={tool.name}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-lg text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                                    {tool.name}
                                                </h4>
                                                {tool.featured && (
                                                    <span className="px-2 py-0.5 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 text-xs font-medium rounded">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {tool.description}
                                            </p>
                                        </div>
                                        <svg className="w-5 h-5 text-neutral-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Productivity Tools */}
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                                Productivity
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tools.productivity.map((tool) => (
                                    <a
                                        key={tool.name}
                                        href={tool.url}
                                        target="_blank"
                                        className="group flex items-center gap-4 p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 border border-neutral-200 dark:border-neutral-700 hover:border-sky-600 dark:hover:border-sky-600 transition-all duration-200 hover:shadow-lg"
                                    >
                                        <Image 
                                            src={tool.image} 
                                            className="w-12 h-12 rounded-lg flex-shrink-0" 
                                            alt={tool.name}
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1">
                                                {tool.name}
                                            </h4>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                {tool.description}
                                            </p>
                                        </div>
                                        <svg className="w-5 h-5 text-neutral-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}