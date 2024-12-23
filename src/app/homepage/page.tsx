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
                <div className="flex justify-center gap-10">
                    <a target="_blank" href="https://github.com/renggamaulana">
                    <svg className="w-6 h-6 md:w-8 md:h-8 hover:dark:text-orange-500 hover:text-orange-500 transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
                    </svg>
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/in/rengga-maulana-93b901194/">
                    <svg className="w-6 h-6 md:w-8 md:h-8 hover:dark:text-orange-500 hover:text-orange-500 transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd"/>
                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                    </svg>
                    </a>
                    <a target="_blank" href="https://www.instagram.com/renggaamln/">
                    <svg className="w-6 h-6 md:w-8 md:h-8 hover:dark:text-orange-500 hover:text-orange-500 transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                    </svg>
                    </a>
                    <a target="_blank" href="https://www.facebook.com/profile.php?id=100004812490429&locale=id_ID">
                    <svg className="w-6 h-6 md:w-8 md:h-8 hover:dark:text-orange-500 hover:text-orange-500 transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
                    </svg>
                    </a>
                    <a href="https://open.spotify.com/show/6ntd3vlAEAWSQHhjt5WhHG?si=c956e8f08fde4792" target="_blank">
                    <svg className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 ease-in-out transform hover:translate-y-[-10px] text-gray-800 dark:text-white hover:text-orange-400 hover:dark:text-orange-400 fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,300,150">
                        <g transform="">
                        <g fill="currentColor" fill-rule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" textAnchor="none">
                            <g transform="translate(20.43392,-10.19392) scale(5.12,5.12)">
                            <path d="M25.009,1.982c-12.687,0 -23.009,10.322 -23.009,23.009c0,12.687 10.322,23.009 23.009,23.009c12.687,0 23.009,-10.321 23.009,-23.009c0,-12.688 -10.322,-23.009 -23.009,-23.009zM34.748,35.333c-0.289,0.434 -0.765,0.668 -1.25,0.668c-0.286,0 -0.575,-0.081 -0.831,-0.252c-2.473,-1.649 -6.667,-2.749 -10.167,-2.748c-3.714,0.002 -6.498,0.914 -6.526,0.923c-0.784,0.266 -1.635,-0.162 -1.897,-0.948c-0.262,-0.786 0.163,-1.636 0.949,-1.897c0.132,-0.044 3.279,-1.075 7.474,-1.077c3.5,-0.002 8.368,0.942 11.832,3.251c0.69,0.46 0.876,1.391 0.416,2.08zM37.74,29.193c-0.325,0.522 -0.886,0.809 -1.459,0.809c-0.31,0 -0.624,-0.083 -0.906,-0.26c-4.484,-2.794 -9.092,-3.385 -13.062,-3.35c-4.482,0.04 -8.066,0.895 -8.127,0.913c-0.907,0.258 -1.861,-0.272 -2.12,-1.183c-0.259,-0.913 0.272,-1.862 1.184,-2.12c0.277,-0.079 3.854,-0.959 8.751,-1c4.465,-0.037 10.029,0.61 15.191,3.826c0.803,0.5 1.05,1.56 0.548,2.365zM40.725,22.013c-0.373,0.634 -1.041,0.987 -1.727,0.987c-0.344,0 -0.692,-0.089 -1.011,-0.275c-5.226,-3.068 -11.58,-3.719 -15.99,-3.725c-0.021,0 -0.042,0 -0.063,0c-5.333,0 -9.44,0.938 -9.481,0.948c-1.078,0.247 -2.151,-0.419 -2.401,-1.495c-0.25,-1.075 0.417,-2.149 1.492,-2.4c0.185,-0.043 4.573,-1.053 10.39,-1.053c0.023,0 0.046,0 0.069,0c4.905,0.007 12.011,0.753 18.01,4.275c0.952,0.56 1.271,1.786 0.712,2.738z"></path>
                            </g>
                        </g>
                        </g>
                    </svg>
                    </a>
                </div>
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
                                <a href="https://daphone.my.id" className="hover:text-orange-400 group">
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