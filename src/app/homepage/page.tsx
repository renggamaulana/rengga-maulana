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
import SocialMedia from "@/components/SocialMedia";


export default function Homepage() {
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    // Intersection Observer untuk mengamati elemen tersembunyi
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

    // Mengamati semua elemen yang tersembunyi
    sectionsRef.current.forEach((el) => {
      if (el) {
        // Hanya observe elemen yang tidak null
        observer.observe(el);
      }
    });

    // Bersihkan observer saat komponen tidak digunakan lagi
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
            description: 'Rillbite is the best recipe app for anyone who wants to lead a healthier life.',
            stacks: ['Next.js', 'Tailwind', 'TypeScript'],
            image: rillbite,
            link: 'https://rillbite.vercel.app/'
        },
        {
            name: 'Daphone',
            description: 'Daphone is an e-commerce website for selling or trade-in a secondhand gadget from around Jabodetabek.',
            stacks: ['Laravel', 'Tailwind', 'Vite'],
            image: daphone,
            link: 'https://daphone.vercel.app/'
        },
        {
            name: 'Atmosight',
            description: 'Atmosight delivers real-time weather forecasts for cities worldwide with a clean, easy-to-use interface.',
            stacks: ['Next.js', 'Tailwind', 'OpenWeather API'],
            image: atmosight,
            link: 'https://atmosight.vercel.app/'
        },
        {
            name: 'Everyday Quotes',
            description: 'Everyday Quotes is a random quotes generator to find quotes from famous people on earth.',
            stacks: ['HTML', 'CSS', 'JavaScript'],
            image: everydayQuotes,
            link: 'https://everyday-quotes.vercel.app/'
        },
        {
            name: 'Transaction Restful API Service',
            description: 'In this project, I designed a service pattern for transactions, including sending and withdrawing funds, integrated with a user management system.',
            stacks: ['Fastify', 'Prisma ORM', 'JWT Auth'],
            image: restfulApi,
            link: 'https://github.com/renggamaulana/concreteAI-be-assignment'
        },
        {
            name: 'Suzu Nihongo',
            description: 'Suzu Nihongo stands for 少しずつ日本語(Sukoshi Zutsu Nihongo) where everyone can learn Japanese bit by bit.',
            stacks: ['Next.js', 'TypeScript', 'API(Laravel)'],
            image: suzuNihongo,
            link: 'https://suzu-nihongo.vercel.app/'
        },
    ]

    return(
        <div className="flex flex-col gap-8 px-5">
            <section ref={(el) => {sectionsRef.current[0] = el}} className="hidden-section md:min-h-screen flex justify-center items-center" id="profile">
            <div className="p-5 md:p-20 flex flex-col gap-10">
                <div className="flex justify-center">
                    <Image src={fox} alt='' className="w-32 md:w-48 mr-3"/>
                </div>
                <div className="text-center">
                    <a href="#profile" className="capriola text-5xl text-orange-500  font-semibold font-bangers tracking-widest uppercase">
                        {/* <span className="shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ff8000,0_0_15px_#ff8000,0_0_30px_#ff8000]">Rengga Maulana</span> */}
                        Rengga Maulana
                    </a>
                    <p className="pt-2 dark:text-gray-50 text-gray-800 text-lg md:text-2xl font-semibold font-bangers tracking-widest">
                        <TypedText
                            strings={["Web Developer", "Keyboard Warrior 💻", "Bug Breeder (unintentionally)", "Proffesional Sleeper 😴"]}
                            typeSpeed={50}
                            backSpeed={40}
                            loop={true}
                        />
                    </p>
                </div>
                <p className="text-center text-gray-800 dark:text-gray-50 text-xl lg:text-lg tracking-wider leading-8">I create and develop web experiences, focused on producing <span className="font-bold text-orange-500 italic underline">beautifully</span> designed and <span className="font-bold text-orange-500 italic underline">effectively</span> functional websites.</p>
                <SocialMedia pathname="" />
            </div>
            </section>
            <section ref={(el) => {sectionsRef.current[1] = el}} className="hidden-section pt-5" id="projects">
                <div className="relative inline-block">
                    <span className="absolute inset-0 bg-orange-500 h-3 top-6 -z-10"></span>
                    <h1 className="font-bold text-neutral-700 dark:text-neutral-100 text-3xl">Projects</h1>
                </div>
                <div className="grid grid-cols-1 mt-10 gap-3 md:gap-10 md:grid-cols-2">
                    {projects.map((project) => {
                        return (
                            <div className="dark:bg-neutral-900 bg-white shadow-lg dark:md:border dark:md:bg-neutral-900 dark:md:border-none rounded px-3 py-5 md:px-5 md:py-8">
                            <div className="flex flex-wrap md:flex-nowrap items-center gap-5 md:gap-7">
                                <Image src={project.image} className="w-full h-48 md:w-48 md:h-28 object-container rounded" alt="" />
                                <a href={project.link} target="_blank" className="hover:text-orange-400 group">
                                <div className="flex gap-5 items-center">
                                    <h3 className="text-gray-800 dark:text-gray-50 text-xl font-semibold group-hover:text-orange-400">{project.name}</h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800 dark:text-gray-50 size-6 group-hover:-translate-y-1 group-hover:text-orange-400">
                                    <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                </a>
                            </div>
                            <p className="font-medium text-gray-500 dark:text-gray-400 text-lg mt-5">{project.description}</p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                {project.stacks.map((stack) => {
                                    return(
                                        <span key={stack} className="px-4 py-1 hover:-translate-y-0.5 duration-300 bg-gray-50 border border-orange-600 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-orange-800 hover:text-neutral-100 text-orange-500 rounded-full shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_2px_#ff8000,0_0_1px_#ff8000,0_0_8px_#ff8000]">{stack}</span>
                                    )
                                })}
                            </div>
                        </div>
                        )
                    })}
                </div>
            </section>
            <section ref={(el) => {sectionsRef.current[2] = el}} className="hidden-section min-h-screen pt-5" id="stack">
                <div className="mb-5">
                <div className="relative inline-block">
                    <span className="absolute inset-0 bg-orange-500 h-3 top-6 -z-10"></span>
                    <h1 className="font-bold text-neutral-700 dark:text-neutral-100 text-3xl">Stack</h1>
                </div>
                <p className="text-xl text-neutral-400 tracking-wide">Tools and technologies I use.</p>
                </div>

                {/* Tools Section */}
                <div className="flex flex-col gap-8">
                {/* Coding */}
                <div className="flex flex-col rounded-2xl p-1 bg-neutral-100 dark:bg-neutral-900 ">
                    <p className="m-0 block shrink-0 px-4 py-2 font-medium text-md md:text-xl text-neutral-900 dark:text-neutral-100">Coding</p>
                    <div className="relative flex-1 overflow-hidden rounded-xl border shadow-sm border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 grid gap-x-2 p-2 sm:grid-cols-2">
                    {/* Github */}
                    <a href="https://github.com" target="_blank" className="flex items-center gap-4 rounded-lg p-4 no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Image src={github} className="w-12 h-12 object-cover rounded-lg" alt="" />
                        <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-neutral-900 dark:text-neutral-100">Github</p>
                            <span className="rounded-full px-2 font-medium text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">Featured</span>
                        </div>
                        <p className="text-neutral-500 text-lg dark:text-neutral-400">Simple repository management.</p>
                        </div>
                    </a>
                    {/* Postman */}
                    <a href="https://postman.com" target="_blank" className="flex items-center gap-4 rounded-lg p-4 no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Image src={postman} className="w-12 h-12 object-cover rounded-lg" alt="" />
                        <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-neutral-900 dark:text-neutral-100">Postman</p>
                            <span className="rounded-full px-2 font-medium text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></span>
                        </div>
                        <p className="text-neutral-500 text-lg dark:text-neutral-400">Build and test API.</p>
                        </div>
                    </a>
                    {/* Chat GPT */}
                    <a href="https://chatgpt.com" target="_blank" className="flex items-center gap-4 rounded-lg p-4 no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Image src={chatGpt} className="w-12 h-12 object-cover rounded-lg" alt="" />
                        <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-neutral-900 dark:text-neutral-100">Chat GPT</p>
                            <span className="rounded-full px-2 font-medium text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></span>
                        </div>
                        <p className="text-neutral-500 text-lg dark:text-neutral-400">ChatGPT on your desktop.</p>
                        </div>
                    </a>
                    {/* Docker */}
                    <a href="https://docker.com" target="_blank" className="flex items-center gap-4 rounded-lg p-4 no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Image src={docker} className="w-12 h-12 object-cover rounded-lg" alt="" />
                        <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-neutral-900 dark:text-neutral-100">Docker</p>
                            <span className="rounded-full px-2 font-medium text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></span>
                        </div>
                        <p className="text-neutral-500 text-lg dark:text-neutral-400">Docker simplifies running apps in portable containers.</p>
                        </div>
                    </a>
                    </div>
                </div>
                {/* Productivity */}
                <div className="flex flex-col rounded-2xl p-1 bg-neutral-100 dark:bg-neutral-900">
                    <p className="m-0 block shrink-0 px-4 py-2 font-medium text-md md:text-xl text-neutral-900 dark:text-neutral-100">Productivity</p>
                    <div className="relative flex-1 overflow-hidden rounded-xl border shadow-sm border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 grid gap-x-2 p-2 sm:grid-cols-2">
                    {/* Notion */}
                    <a href="https://notion.so" target="_blank" className="flex items-center gap-4 rounded-lg p-4 no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Image src={notion} className="w-12 h-12 object-cover rounded-lg" alt="" />
                        <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-neutral-900 dark:text-neutral-100">Notion</p>
                            <span className="rounded-full px-2 font-medium text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></span>
                        </div>
                        <p className="text-neutral-500 text-lg dark:text-neutral-400">Documents with endless possibilities.</p>
                        </div>
                    </a>
                    {/* Postman */}
                    <a href="https://pitch.com" target="_blank" className="flex items-center gap-4 rounded-lg p-4 no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Image src={pitch} className="w-12 h-12 object-cover rounded-lg" alt="" />
                        <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-neutral-900 dark:text-neutral-100">Pitch</p>
                            <span className="rounded-full px-2 font-medium text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></span>
                        </div>
                        <p className="text-neutral-500 text-lg dark:text-neutral-400">Modern, collaborative presentation tool.</p>
                        </div>
                    </a>
                    {/* Chat GPT */}
                    <a href="https://simplemind.eu" target="_blank" className="flex items-center gap-4 rounded-lg p-4 no-underline transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <Image src={simpleMind} className="w-12 h-12 object-cover rounded-lg" alt="" />
                        <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-lg text-neutral-900 dark:text-neutral-100">Simple Mind</p>
                            <span className="rounded-full px-2 font-medium text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"></span>
                        </div>
                        <p className="text-neutral-500 text-lg dark:text-neutral-400">Visual mind mapping tool for brainstorming.</p>
                        </div>
                    </a>
                    </div>
                </div>

                </div>
            </section>
        </div>
    )
}