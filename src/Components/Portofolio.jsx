import React from "react";
export default function Portofolio(){

    const data = [
        {
            name: 'Book Store',
            desc: 'Web Ecommerce Book using laravel inertia and react js',
            image: '/images/bookstore.png'
        },
        {
            name: 'Vue Shop',
            desc: 'Web Ecommerce using laravel inertia and vue js 3',
            image: '/images/ecommerce-vue.png'
        },
        {
            name: 'Libarary App',
            desc: 'Web libray using laravel and livewire 3',
            image: '/images/libraryapp.png'
        },
        {
            name: 'jquery',
            desc: 'lorem',
            image: '/images/bookstore.png'
        },
        {
            name: 'jquery',
            desc: 'lorem',
            image: '/images/bookstore.png'
        },
        {
            name: 'jquery',
            desc: 'lorem',
            image: '/images/bookstore.png'
        },
        {
            name: 'jquery',
            desc: 'lorem',
            image: '/images/bookstore.png'
        },{
            name: 'jquery',
            desc: 'lorem',
            image: '/images/bookstore.png'
        }

    ]
    return(
        <div id="portofolio" className="section mt-32">
            <div className="container mx-auto max-w-[1200px] px-3 pt-3 pb-20 ">
                <div className="flex flex-col lg:align-center lg:flex-row justify-between mb-[50px]">
                <div className="order-2 lg:order-1 mt-5">
                    <h4 className="text-secondary font-secondary text-[24px]">Recent Work</h4>
                    <div className="text-gradient font-primary max-w-[700px] text-[24px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At facilis numquam quia. Ea quos, totam.
                    </div>
                </div>
                <div className="order-1 lg:order-2 text-center">
                    <h2 className="text-gradient font-primary max-w-[700px] mx-auto text-[50px] lg:mt-8">8</h2>
                    <div className="text-gray-100">
                        Completed Projects
                    </div>
                </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                    {data.map((item, index) => (
                    <div className="w-full" key={index}>
                        <div className="bg-white h-full w-full justify-center items-center flex rounded-lg overflow-hidden p-5 relative group"  >
                            <img src={item.image} alt=""/>
                            <div className="absolute p-5 bg-primary w-full h-full flex items-center opacity-0 group-hover:opacity-100 transition duration-150">
                                <div className="text-center w-full text-white mt-[60px] group-hover:mt-0 transition-all">
                                    <div className="bg-white px-4 py-2 inline-block mb-2 rounded-full">
                                        <h4 className="text-gradient">{item.name}</h4>
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
    )
}