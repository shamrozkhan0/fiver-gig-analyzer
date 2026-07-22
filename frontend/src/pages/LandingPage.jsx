import ProblemSection from "../components/ProblemSection.jsx"
import HeroSection from "../components/HeroSection.jsx"
import HowItWorks from "../components/HowItWorks.jsx"
import Analysis from "../components/Analysis.jsx"
import Navbar from "../components/Navbar.jsx"

const LandingPage = () => {
    return (
        <>
            <Navbar/>
            <HeroSection/>
            <ProblemSection/>
            <HowItWorks/>
            <Analysis/>
        </>
    )
}

export default LandingPage;
