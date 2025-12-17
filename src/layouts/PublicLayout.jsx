import React from 'react'
import Navigation from "../Components/Navigation"
import Banner from "../Components/Banner"
import Profile from "../Components/Profile"
import Portofolio from "../Components/Portofolio"
import Footer from "../Components/Footer"
import Contact from "../Components/Contact"

export default function PublicLayout() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation />
      <Banner />
      <Profile />
      <Portofolio />
      <Contact />
      <Footer />
    </div>
  )
}
