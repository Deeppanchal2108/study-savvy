
import Navbar from "@/components/section/navbar";
import HeroSection from "@/components/section/hero-section";
import FeatureSection from "@/components/section/feature-section";
import HowItWorks from "@/components/section/how-works";
import TypingSection from "@/components/section/typing-section";
import Footer from "@/components/section/footer";
export function Landing() {
    

    return (
        <>
        
            <Navbar />
            <HeroSection />
            <TypingSection/>
            <FeatureSection />
            
            
            <HowItWorks />

            <Footer />
        </>
       
        
    );
}
