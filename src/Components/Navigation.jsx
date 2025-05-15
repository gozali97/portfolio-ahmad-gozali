import React, { useState, useEffect } from "react";
import {
    IconHome,
    IconUser,
    IconBriefcase,
    IconMail,
    IconMenu2,
    IconX,
    IconCode
} from "@tabler/icons-react";
import { Link } from "react-scroll";

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll event to change navigation style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation items
    const navItems = [
        { to: "banner", label: "Home", icon: <IconHome size={20} /> },
        { to: "profile", label: "About", icon: <IconUser size={20} /> },
        { to: "portofolio", label: "Portfolio", icon: <IconBriefcase size={20} /> },
        { to: "contact", label: "Contact", icon: <IconMail size={20} /> },
    ];

    return (
        <>
            {/* Desktop Navigation - Top Bar */}
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto max-w-6xl px-6">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="p-2 bg-indigo-600/20 rounded-lg mr-3">
                                <IconCode size={24} className="text-indigo-400" />
                            </div>
                            <span className="text-xl font-bold text-white">Ahmad Gozali</span>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    activeClass="text-indigo-400"
                                    className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 cursor-pointer font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <a 
                                href="#" 
                                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 font-medium"
                            >
                                Resume
                            </a>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden p-2 rounded-lg bg-gray-800 text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <div className="flex flex-col h-full justify-center items-center">
                    <nav className="flex flex-col items-center space-y-8">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                activeClass="text-indigo-400"
                                className="text-white hover:text-indigo-400 transition-colors duration-300 cursor-pointer text-xl font-medium flex items-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                        <a 
                            href="#" 
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300 text-xl font-medium mt-4"
                        >
                            Resume
                        </a>
                    </nav>
                </div>
            </div>

            {/* Side Navigation for Desktop (Optional) */}
            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
                <div className="flex flex-col gap-4 bg-gray-800/70 backdrop-blur-sm p-2 rounded-full border border-gray-700 shadow-xl">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-indigo-600/50 transition-all duration-300 group relative"
                            activeClass="bg-indigo-600 text-white"
                        >
                            {item.icon}
                            <span className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}