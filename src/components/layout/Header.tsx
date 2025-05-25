"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef<HTMLHeadElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const header = headerRef.current;
        const logo = logoRef.current;
        const nav = navRef.current;

        if (!header || !logo || !nav) return;

        // Initial header animation
        gsap.set([logo, nav], { opacity: 0, y: -20 });

        const tl = gsap.timeline({ delay: 4 }); // Start after loading screen
        tl.to([logo, nav], {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
        });

        // Header background on scroll
        ScrollTrigger.create({
            trigger: header,
            start: "top top",
            endTrigger: "body",
            end: "bottom top",
            onUpdate: (self) => {
                const progress = self.progress;
                if (progress > 0.1) {
                    gsap.to(header, {
                        backgroundColor: "rgba(240, 233, 225, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 2px 20px rgba(46, 42, 38, 0.1)",
                        duration: 0.3,
                    });
                } else {
                    gsap.to(header, {
                        backgroundColor: "transparent",
                        backdropFilter: "none",
                        boxShadow: "none",
                        duration: 0.3,
                    });
                }
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div ref={logoRef}>
                        <Link href="/" className="flex items-center space-x-3">
                            <Image
                                src="/images/icons/logo.png"
                                alt="InchScale"
                                width={50}
                                height={50}
                                className="w-auto h-12"
                            />
                            <div className="hidden sm:block">
                                <span className="text-xl font-playfair font-bold text-dark">
                                    InchScale
                                </span>
                                <p className="text-xs text-accent tracking-wider uppercase">
                                    Design Studio
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav ref={navRef} className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-dark hover:text-accent transition-colors duration-300 font-medium tracking-wide relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <Link
                            href="/book-consultation"
                            className="btn-primary px-6 py-2 rounded-none text-sm"
                        >
                            Book Consultation
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`w-6 h-0.5 bg-dark transition-all duration-300 ${
                                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                            }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-dark transition-all duration-300 ${
                                isMenuOpen ? "opacity-0" : ""
                            }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-dark transition-all duration-300 ${
                                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                            }`}
                        />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${
                        isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                >
                    <nav className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-dark hover:text-accent transition-colors duration-300 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/book-consultation"
                            className="btn-primary px-6 py-2 rounded-none text-sm inline-block text-center"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Book Consultation
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
