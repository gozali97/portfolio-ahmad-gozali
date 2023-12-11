import React from "react";
import {
    IconFileLike,
    IconHome,
    IconPhoneCall,
    IconReceipt,
    IconUser,
    IconUserCircle,
    IconUsers
} from "@tabler/icons-react";
import {Link} from "react-scroll";
export default function Navigation(){
    return(
            <div className="fixed bottom-4 left-0 right-0 text-center z-10 lg:translate-y-[-50%] lg:top-[50%] lg:left-auto lg:right-5">
                <div className="flex justify-between bg-white mx-auto text-secondary p-2 rounded-full border-blue-800 border-solid border-[1px] max-w-[210px] lg:flex-col gap-4">
                    <Link to="banner" activeClass="active" className="cursor-pointer flex w-8 h-8 px-2 lg:w-[50px] lg:h-[50px] justify-center items-center hover:bg-blue-200 rounded-full lg:px-4" offset={-100} smooth={true} spy={true}>
                        <IconHome/>
                    </Link>
                    <Link to="profile" activeClass="active" className="cursor-pointer flex w-8 h-8 px-2 lg:w-[50px] lg:h-[50px] justify-center items-center hover:bg-blue-200 rounded-full lg:px-4" offset={-100} smooth={true} spy={true}>
                        <IconUserCircle/>
                    </Link>
                    <Link to="portofolio" activeClass="active" className="cursor-pointer flex w-8 h-8 px-2 lg:w-[50px] lg:h-[50px] justify-center items-center hover:bg-blue-200 rounded-full lg:px-4" offset={-100} smooth={true} spy={true}>
                        <IconFileLike/>
                    </Link>
                    <Link to="contact" activeClass="active" className="cursor-pointer flex w-8 h-8 px-2 lg:w-[50px] lg:h-[50px] justify-center items-center hover:bg-blue-200 rounded-full lg:px-4" offset={-100} smooth={true} spy={true}>
                        <IconPhoneCall/>
                    </Link>
                </div>
            </div>
    )
}