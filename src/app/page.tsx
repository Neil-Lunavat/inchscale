"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/animations/LoadingScreen";
import HeroSection from "@/components/home/HeroSection";
import RoomEvolutionSection from "@/components/home/RoomEvolutionSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import ProcessSection from "@/components/home/ProcessSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Enhanced loading experience
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Ensure smooth scroll behavior after loading
            document.documentElement.style.scrollBehavior = "smooth";
        }, 3500);

        return () => {
            clearTimeout(timer);
            // Clean up scroll behavior
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}

            <div className={`main-content ${!isLoading ? "loaded" : ""}`}>
                {/* Hero Section */}
                <HeroSection />

                {/* About Preview - Brief intro */}
                <AboutPreview />

                {/* Services Overview */}
                <ServicesOverview />

                {/* THE MAIN EVENT - Room Evolution */}
                <RoomEvolutionSection />

                {/* Why Choose Us */}
                <WhyChooseUs />

                {/* Featured Projects */}
                <ProjectsShowcase />

                {/* Process Overview */}
                <ProcessSection />

                {/* Final CTA */}
                <CTASection />
            </div>
        </>
    );
}
