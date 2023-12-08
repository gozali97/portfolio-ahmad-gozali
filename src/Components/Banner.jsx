import React from "react";
import {TypeAnimation} from "react-type-animation";
import {
    IconAccessible,
    IconAccessibleOffFilled,
    IconBrandLaravel,
    IconBrandPhp,
    IconBrandReact
} from "@tabler/icons-react";

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
                           <IconBrandReact size="50"/>
                            <p>Frontend Developer</p>
                        </div>
                        <div className="flex max-w-xs items-center space-x-2 px-4 py-4 text-sm font-medium text-gray-200">
                            <IconBrandPhp size="50"/>
                            <p>Backend Developer</p>
                        </div>
                        <div className="flex max-w-xs items-center space-x-2 px-4 py-4 text-sm font-medium text-gray-200">
                            <IconBrandLaravel size="50"/>
                            <p>Laravel Developer</p>
                        </div>
                    </div>
                </section>
            </div>
    )
}