import React from "react";
import {TypeAnimation} from "react-type-animation";

export default function Banner(){
    return(
            <div id="banner" className="section flex justify-center pt-32">
                <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
                    <div className="shrink-0 from-white/40 absolute left-1/2 h-96 w-96 -translate-x-1/2 rounded-full border border-gray-500 bg-gradient-to-br"></div>

                    <div data-aos="fade-up"
                         data-aos-duration="3000"
                         data-aos-delay="0"
                         className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <h4 className="mt-10 text-md font-semibold leading-snug text-white sm:text-5xl sm:leading-snug lg:text-xl lg:leading-snug">
                                Hello, I am
                            </h4>
                                <div className="text-3xl inline-flex text-white justify-center whitespace-nowrap font-bold">
                                    <TypeAnimation
                                        sequence={[
                                            'Fullstack Developer',
                                            3000,
                                            'Frontend Developer',
                                            3000,
                                            'Backend Developer',
                                            1000
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        style={{ fontSize: '1em', display: 'inline-block' }}
                                        repeat={Infinity}
                                    />
                                </div>
                            <p className="mx-auto lg:mx-52 mt-10 max-w-md text-sm leading-7 text-gray-300">A passionate Full Stack Developer. I have expertise in developing using popular frameworks such as Laravel and CodeIgniter. In frontend development, I have experience with React JS and Vue JS. Furthermore, I also possess skills in managing databases using MySQL and PostgreSQL.</p>
                        </div>
                    </div>

                    <div data-aos="fade-up"
                         data-aos-duration="3000"
                         data-aos-delay="0"
                         className="mt-32 mb-16 flex flex-col items-center justify-center divide-y divide-gray-500 border border-gray-600 bg-gray-700 shadow-lg sm:flex-row sm:divide-x sm:divide-y-0 md:mt-32">
                        <div className="flex max-w-xs items-center space-x-2 px-4 py-4 text-sm font-medium text-gray-200">
                            <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M7.00001 0.769043C6.26017 0.769043 5.52453 0.864057 4.83158 1.06063"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M0.75001 13.2307V6.49181C0.75001 4.84532 1.27674 3.58257 2.11801 2.66748"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M13.25 13.2308V7.57227"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M7 0.769043C9.68738 0.769043 12.3194 2.02268 13.0506 4.8437"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M4.34512 13.231C4.34512 13.231 4.01 12.175 3.75866 10.6465"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M9.65489 13.231C9.65489 13.231 10.5128 10.5275 10.5128 7.51072C10.5128 6.9208 10.4366 6.41965 10.3027 5.99512"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M7 11.4219V12.4219"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M3.48719 7.51072C3.48719 4.49393 5.47919 3.79883 7.00001 3.79883C7.45091 3.79883 7.94324 3.85993 8.41278 4.02453"></path><path stroke="white" strokeLinecap="round" d="M5.82499 8.51465C5.82499 7.57669 6.35106 7.06632 7 7.06632C7.64895 7.06632 8.17502 7.57669 8.17502 8.51465"></path></svg>
                            <p>Frontend Developer</p>
                        </div>
                        <div className="flex max-w-xs items-center space-x-2 px-4 py-4 text-sm font-medium text-gray-200">
                            <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path fill="none" stroke="white" d="M1.88762 10.6061C2.05024 12.0408 3.26347 13.1594 4.70643 13.2106C5.43839 13.2366 6.18998 13.25 7.00002 13.25C7.81007 13.25 8.56165 13.2366 9.29361 13.2106C10.7366 13.1594 11.9498 12.0408 12.1124 10.6061C12.1691 10.1061 12.2084 9.59799 12.2084 9.08335C12.2084 8.56872 12.1691 8.06065 12.1124 7.56059C11.9498 6.1259 10.7366 5.00729 9.29361 4.95608C8.56165 4.93011 7.81007 4.91669 7.00002 4.91669C6.18998 4.91669 5.43839 4.93011 4.70643 4.95608C3.26346 5.00729 2.05024 6.1259 1.88762 7.56059C1.83093 8.06065 1.79169 8.56872 1.79169 9.08335C1.79169 9.59799 1.83093 10.1061 1.88762 10.6061Z"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M9.91665 4.91667V3.66667C9.91665 2.89312 9.60936 2.15125 9.06237 1.60427C8.51539 1.05729 7.77353 0.75 6.99998 0.75C6.22643 0.75 5.48457 1.05729 4.93759 1.60427C4.3906 2.15125 4.08331 2.89312 4.08331 3.66667V4.91667"></path><path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M7 8.50006L7 9.5"></path></svg>
                            <p>Fullstack Developer</p>
                        </div>
                        <div className="flex max-w-xs items-center space-x-2 px-4 py-4 text-sm font-medium text-gray-200">
                            <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M0.796814 6.74899C0.796814 3.05244 2.34761 1.4682 2.86454 0.940125H11.1355C11.6524 1.4682 13.2032 3.05244 13.2032 6.74899C13.2032 10.9736 9.13011 12.5318 7.06238 13.0599C4.99465 12.5318 0.796814 10.9736 0.796814 6.74899Z"></path><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M7.00004 7.78243C8.15243 7.78243 9.08663 6.84823 9.08663 5.69584C9.08663 4.54345 8.15243 3.60925 7.00004 3.60925C5.84765 3.60925 4.91345 4.54345 4.91345 5.69584C4.91345 6.84823 5.84765 7.78243 7.00004 7.78243Z"></path><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M10.4848 11.5944C9.30446 12.3843 7.98414 12.8244 7.06236 13.0598C6.12771 12.8211 4.75784 12.3719 3.53717 11.5612C3.7638 11.2242 4.03998 10.9198 4.35893 10.6591C5.10426 10.0499 6.03728 9.7171 6.99991 9.7171C7.96253 9.7171 8.89556 10.0499 9.64089 10.6591C9.9703 10.9283 10.2541 11.2443 10.4848 11.5944Z"></path></svg>
                            <p>Laravel Developer</p>
                        </div>
                    </div>
                </section>
            </div>
    )
}