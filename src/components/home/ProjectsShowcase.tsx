"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        id: 1,
        title: "KK Market Office",
        category: "Commercial",
        location: "Pune",
        image: "/images/projects/kk-market-office.jpg",
        description:
            "Modern office design with luxury finishes and efficient space planning.",
    },
    {
        id: 2,
        title: "Koregaon Park Office",
        category: "Commercial",
        location: "Pune",
        image: "/images/projects/koregaon-park-office.jpg",
        description:
            "Contemporary workspace design promoting collaboration and creativity.",
    },
    {
        id: 3,
        title: "Executive Conference Room",
        category: "Commercial",
        location: "Mumbai",
        image: "/images/projects/conference-room.jpg",
        description:
            "Sophisticated meeting space with advanced technology integration.",
    },
    {
        id: 4,
        title: "Luxury Residential",
        category: "Residential",
        location: "Goa",
        image: "/images/projects/luxury-residential.jpg",
        description:
            "Elegant home interior with sustainable materials and custom furniture.",
    },
];

export default function ProjectsShowcase() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const sectionRef = useRef<HTMLOptionElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const categories = ["All", "Commercial", "Residential"];

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const title = titleRef.current;
        const filters = filtersRef.current;
        const grid = gridRef.current;

        if (!section || !title || !filters || !grid) return;

        // Initial setup
        gsap.set([title, filters], { opacity: 0, y: 60 });
        gsap.set(grid.children, { opacity: 0, y: 80, scale: 0.9 });

        // Reveal animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
            },
        });

        tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
        })
            .to(
                filters,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.5"
            )
            .to(
                grid.children,
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.7)",
                },
                "-=0.3"
            );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter(
                  (project) => project.category === selectedCategory
              );

    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);

        if (gridRef.current) {
            // Animate out
            gsap.to(gridRef.current.children, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    // Animate in with new content
                    gsap.to(gridRef.current!.children, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                    });
                },
            });
        }
    };

    return (
        <section ref={sectionRef} className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-12">
                    <span className="text-accent font-medium tracking-wider uppercase text-sm">
                        Our Portfolio
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-dark mt-4 mb-6">
                        Featured
                        <span className="text-gradient"> Projects</span>
                    </h2>
                    <p className="text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
                        Explore our curated collection of exceptional spaces
                        that showcase our commitment to design excellence and
                        craftsmanship.
                    </p>
                </div>

                {/* Filters */}
                <div ref={filtersRef} className="flex justify-center mb-12">
                    <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleFilterChange(category)}
                                className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                                    selectedCategory === category
                                        ? "bg-accent text-white shadow-md"
                                        : "text-text-light hover:text-accent"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div
                    ref={gridRef}
                    className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
                >
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card group cursor-pointer rounded-lg overflow-hidden"
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="bg-white text-dark px-6 py-3 rounded-lg font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-1 group-hover:text-accent transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <p className="text-text-light text-sm">
                                            {project.category} •{" "}
                                            {project.location}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-text-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/projects"
                        className="btn-primary px-8 py-3 inline-block"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
