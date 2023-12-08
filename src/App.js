import Header from "./Components/Header";
import AOS from "aos";
import "aos/dist/aos.css"
import {useEffect} from "react";
import Navigation from "./Components/Navigation";
import Banner from "./Components/Banner";
import Profile from "./Components/Profile";
import Portofolio from "./Components/Portofolio";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";

function App() {

    useEffect(() => {
        AOS.init()
    }, []);

    return <div className="bg-gray-900">
        <Header/>
        <Navigation/>
        <Banner/>
        <Profile/>
        <Portofolio/>
        <Contact/>
        <Footer/>
    </div>
}

export default App
