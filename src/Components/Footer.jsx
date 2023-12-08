import React from "react";
import {Link} from "react-scroll";
export default function Footer(){
    return(
            <footer className="flex flex-col space-y-10 justify-center py-20 -mb-24 bg-gray-800">
                <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                    <Link to="banner" activeClass="active" className="text-gray-100 cursor-pointer hover:text-gray-200">Home</Link>
                    <Link to="profile" activeClass="active" className="text-gray-100 cursor-pointer hover:text-gray-200">Profile</Link>
                    <Link to="portofolio" activeClass="active" className="text-gray-100 cursor-pointer hover:text-gray-200">Portofolio</Link>
                </nav>

                <div className="flex justify-center space-x-5">
                    <a href="https://github.com/gozali97" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/github.png" />
                    </a>
                    <a href="https://www.linkedin.com/in/ahmad-gozali" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
                    </a>
                    <a href="https://instagram.com/agozalii" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
                    </a>
                    <a href="https://twitter.com/tylerzall" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
                    </a>
                </div>
                <p className="text-center text-gray-700 font-medium">&copy; 2023 Ahmad Gozali. All rights reservered.</p>
            </footer>
    )
}