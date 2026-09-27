import DoctorDiscoveryBanner from '../components/home/DoctorDiscoveryBanner';
import FeaturesSection from '../components/home/FeaturesSection';
import HeroSection from '../components/home/HeroSection';
import HomeNavbar from '../components/home/HomeNavbar';
import FutureScopeSection from '../components/home/FutureScopeSection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import FinalCtaSection from '../components/home/FinalCtaSection'
import HomeFooter from '../components/home/HomeFooter'

function HomePage() {
    return (
        <div className="min-h-screen bg-[#F7FCFD] text-[#0B2D5C]">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#0B2D5C] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
            >
                Skip to main content
            </a>

            <HomeNavbar />

            <main id="main-content">
                <HeroSection />
                <FeaturesSection />
                <DoctorDiscoveryBanner />
                <FutureScopeSection/>
                <TestimonialsSection/>
                <FinalCtaSection/>
                <HomeFooter/>
            </main>
        </div>
    );
}

export default HomePage;