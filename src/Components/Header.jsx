import React, {useEffect} from "react";
import {IconBrandGithub, IconBrandLinkedin} from "@tabler/icons-react";

export default function Header(){
    return(
            <div  className="container mx-auto max-w-[1200px] px-3 relative lg:absolute left-0 right-0">
                <div className="flex justify-between py-5 items-center">
                    <div
                        data-aos="fade-right"
                        data-aos-duration="3000"
                        data-aos-delay="0"
                        >
                        <a href="/">
                            <h1 className="text-xl text-white font-bold">Ahmad Gozali</h1>
                            <h4 className="text-gray-200 text-sm font-semibold">Web Developer</h4>
                        </a>
                    </div>
                    <div className="flex items-center space-x-3"
                         data-aos="fade-left"
                         data-aos-duration="3000"
                         data-aos-delay="0"
                    >
                        <a href="">
                            <IconBrandGithub className="text-white font-semibold"/>
                        </a>
                        <a href="">
                            <IconBrandLinkedin className="text-white font-semibold"/>
                        </a>
                    </div>
                </div>
            </div>
    )
}