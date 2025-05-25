"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const heroSlides = [
    {
        image: "/images/hero/modern-office-1.jpg",
        title: "Where Your Story Meets",
        subtitle: "Interior Excellence",
        description:
            "Creating dynamic, purpose-driven environments that ignite creativity and elevate everyday experiences.",
    },
    {
        image: "/images/hero/luxury-lounge.jpg",
        title: "Precision in",
        subtitle: "Every Detail",
        description:
            "From concept to completion, we oversee every phase with meticulous attention to detail.",
    },
    {
        image: "/images/hero/modern-workspace.jpg",
        title: "Crafted with Care",
        subtitle: "Built to Inspire",
        description:
            "Tailored to your lifestyle, aesthetics, and aspirations - delivered on time with excellence.",
    },
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroRef = useRef<HTMLOptionElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Initial animation after loading screen
        const initAnimation = () => {
            const tl = gsap.timeline({ delay: 4.5 });

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
            )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 80 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    "-=0.8"
                )
                .fromTo(
                    descriptionRef.current,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.6"
                )
                .fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );
        };

        initAnimation();

        // Auto-slide functionality
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);

        return () => {
            clearInterval(slideInterval);
        };
    }, []);

    useEffect(() => {
        // Animate content change on slide transition
        if (titleRef.current && subtitleRef.current && descriptionRef.current) {
            const tl = gsap.timeline();

            tl.to(
                [titleRef.current, subtitleRef.current, descriptionRef.current],
                {
                    opacity: 0,
                    y: -30,
                    duration: 0.4,
                    ease: "power2.in",
                }
            )
                .set(titleRef.current, {
                    textContent: heroSlides[currentSlide].title,
                })
                .set(subtitleRef.current, {
                    textContent: heroSlides[currentSlide].subtitle,
                })
                .set(descriptionRef.current, {
                    textContent: heroSlides[currentSlide].description,
                })
                .to(
                    [
                        titleRef.current,
                        subtitleRef.current,
                        descriptionRef.current,
                    ],
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        stagger: 0.1,
                    }
                );
        }
    }, [currentSlide]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section ref={heroRef} className="relative h-screen overflow-hidden">
            {/* Background Images */}
            <div className="hero-slider">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${
                            index === currentSlide ? "active" : ""
                        }`}
                    >
                        <Image
                            src={slide.image}
                            alt={`${slide.title} ${slide.subtitle}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <div ref={contentRef} className="hero-content">
                <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-4">
                    <span ref={titleRef}>{heroSlides[currentSlide].title}</span>
                    <br />
                    <span
                        ref={subtitleRef}
                        className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    >
                        {heroSlides[currentSlide].subtitle}
                    </span>
                </h1>

                <p
                    ref={descriptionRef}
                    className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed"
                >
                    {heroSlides[currentSlide].description}
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/projects"
                        className="btn-primary px-8 py-4 text-lg font-medium tracking-wide"
                    >
                        View Our Work
                    </Link>
                    <Link
                        href="/book-consultation"
                        className="btn-secondary px-8 py-4 text-lg font-medium tracking-wide text-white border-white hover:bg-white hover:text-dark"
                    >
                        Start Your Project
                    </Link>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="nav-dots">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`nav-dot ${
                            index === currentSlide ? "active" : ""
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center text-white">
                    <span className="text-sm tracking-widest uppercase mb-4 opacity-80">
                        Scroll to Explore
                    </span>
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}
