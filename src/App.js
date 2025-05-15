import Header from "./Components/Header"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import Navigation from "./Components/Navigation"
import Banner from "./Components/Banner"
import Profile from "./Components/Profile"
import Portofolio from "./Components/Portofolio"
import Footer from "./Components/Footer"
import Contact from "./Components/Contact"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header />
        <Navigation />
        <Banner />
        <Profile />
        <Portofolio />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
