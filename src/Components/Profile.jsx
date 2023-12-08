import React from "react";
export default function Profile(){

    const data = [
        {
            name : 'React JS',
            desc : 'React is the library for web and native user interfaces.',
            image : '/images/react-js.png'
        },
        {
            name : 'Vue JS',
            desc : 'The Progressive JavaScript Framework · Approachable.',
            image : '/images/vue-js.png'
        },
        {
            name : 'Laravel',
            desc : 'Laravel is a PHP web application framework with expressive, elegant syntax.',
            image : '/images/laravel.png'
        },
        {
            name : 'Codeigniter',
            desc : 'The small framework PHP with powerful features.',
            image : '/images/ci.png'
        },
        {
            name : 'MySQL',
            desc : 'MySQL is free and open-source software for storage database.',
            image : '/images/mysql.png'
        },
        {
            name : 'JavaScript',
            desc : 'JavaScript is a programming language for web dev.',
            image : '/images/javascript.png'
        },
        {
            name : 'CSS',
            desc : 'CSS is computer language for laying out and structuring web pages.',
            image : '/images/css.png'
        },
        {
            name : 'HTML',
            desc : 'Markup symbols inserted into a file intended for display on the Internet',
            image : '/images/html.png'
        },
    ];

    return(
        <div id="profile" className="section">
            <div className="container mx-auto max-w-[1200px] p-3 overflow-hidden">
                <div className="font-secondary text-center font-bold mb-12 text-gray-100">
                    <h4 data-aos="fade-in"
                        data-aos-duration="3000"
                        data-aos-delay="0"
                        className="mb-2 text-gray-200">Awesome Skill</h4>
                    <h2 data-aos="fade-in"
                        data-aos-duration="3000"
                        data-aos-delay="0" className="mb-2">My name is Ahmad Gozali.</h2>
                    <p data-aos="fade-in"
                       data-aos-duration="3000"
                       data-aos-delay="0" className="text-sm">
                        I'm a web developer with expertise in web design, development, and testing. I graduated from Yogyakarta University of Technology with a degree in Informatics Engineering. My passion lies in creating scalable web applications and working across the full stack.
                        With over 5 years of experience, I've successfully led teams in delivering innovative web solutions for diverse clients. I'm skilled in technologies like HTML, CSS, JavaScript, as well as popular frameworks such as React and Angular.
                        Furthermore, I have a strong understanding of backend development using languages like Python and Node.js. I also possess experience in designing and managing databases using MySQL and MongoDB.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row items-start justify-between">
                    <div data-aos="fade-in"
                         data-aos-duration="3000"
                         data-aos-delay="0" className="text-center w-full max-w-[400px] mx-auto mb-[50px] flex justify-center flex-col items-center">
                        <div className="max-w-[300px] max-h-[300px] bg-gradient rounded-full overflow-hidden">
                            <img className="w-full" src="/images/ahmad.jpg" alt=""/>
                        </div>
                        <h2 className="text-gradient text-[50px] mt-[20px]">Ahmad Gozali</h2>
                    </div>
                    <div className="w-full lg:ml-5">
                        <div data-aos="fade-up"
                             data-aos-duration="3000"
                             data-aos-delay="0" className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            {data.map((item, index) => (
                            <div className="w-full">
                                <div className="bg-white h-full justify-center items-center flex rounded-lg overflow-hidden relative p-5 group">
                                    <img src={item.image} alt=""/>
                                    <div className="absolute p-5 backdrop-blur-xl cursor-pointer bg-primary w-full h-full flex items-center opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition duration-150 ease-linear">
                                        <div className="text-center w-full text-white">
                                            <div className="bg-white rounded-full px-5 py-2 inline-block mb-2">
                                            <div className="text-gradient">
                                                <h4>{item.name}</h4>
                                            </div>
                                            </div>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}