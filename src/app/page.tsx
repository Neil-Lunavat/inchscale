"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/animations/LoadingScreen";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time and ensure all resources are loaded
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500); // 3.5 seconds loading

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}

            <div className={`main-content ${!isLoading ? "loaded" : ""}`}>
                <HeroSection />
                <AboutPreview />
                <ServicesOverview />
                <ProcessSection />
                <ProjectsShowcase />
                <WhyChooseUs />
                <CTASection />
            </div>
        </>
    );
}
