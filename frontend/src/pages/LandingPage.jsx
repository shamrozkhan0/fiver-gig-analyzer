import ProblemSection from "../components/ProblemSection.jsx"
import HeroSection from "../components/HeroSection.jsx"
import HowItWorks from "../components/HowItWorks.jsx"
import Analysis from "../components/Analysis.jsx"
import Navbar from "../components/Navbar.jsx"
import Faq from "../components/Faq.jsx"
import WhyGigBro from "../components/WhyGigBro.jsx"
import CTA from "../components/CTA.jsx"
import Footer from "../components/Footer.jsx"

const LandingPage = () => {
    return (
        <>
            <Navbar/>
            <HeroSection/>
            <ProblemSection/>
            <HowItWorks/>
            <Analysis/>
            <Faq/>
            <WhyGigBro/>
            <CTA/>
            <Footer/>
        </>
    )
}

export default LandingPage;
