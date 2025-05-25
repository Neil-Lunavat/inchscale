"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function LoadingScreen() {
    const [percentage, setPercentage] = useState(0);
    const loadingRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<HTMLDivElement[]>([]);
    const percentageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Animate percentage counter
        gsap.to(
            { val: 0 },
            {
                val: 100,
                duration: 3,
                ease: "power2.out",
                onUpdate: function () {
                    setPercentage(Math.round(this.targets()[0].val));
                },
            }
        );

        // Animate blueprint lines drawing in
        linesRef.current.forEach((line, index) => {
            if (line) {
                gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
                tl.to(
                    line,
                    {
                        scaleX: 1,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    index * 0.2
                );
            }
        });

        // Animate logo appearance
        if (logoRef.current) {
            gsap.fromTo(
                logoRef.current,
                {
                    scale: 0.8,
                    opacity: 0,
                    rotateY: -180,
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1.5,
                    ease: "back.out(1.7)",
                    delay: 0.5,
                }
            );
        }

        // Animate percentage text
        if (percentageRef.current) {
            gsap.fromTo(
                percentageRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 1,
                }
            );
        }

        // Exit animation
        const exitTimer = setTimeout(() => {
            if (loadingRef.current) {
                gsap.to(loadingRef.current, {
                    opacity: 0,
                    scale: 1.1,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (loadingRef.current) {
                            loadingRef.current.style.display = "none";
                        }
                    },
                });
            }
        }, 3200);

        return () => {
            clearTimeout(exitTimer);
            tl.kill();
        };
    }, []);

    const addLineRef = (el: HTMLDivElement | null, index: number) => {
        if (el && !linesRef.current[index]) {
            linesRef.current[index] = el;
        }
    };

    return (
        <div ref={loadingRef} className="loading-screen">
            {/* Blueprint Lines */}
            <div
                ref={(el) => addLineRef(el, 0)}
                className="loading-line loading-line-1"
            />
            <div
                ref={(el) => addLineRef(el, 1)}
                className="loading-line loading-line-2"
            />
            <div
                ref={(el) => addLineRef(el, 2)}
                className="loading-line loading-line-3"
            />
            <div
                ref={(el) => addLineRef(el, 3)}
                className="loading-line loading-line-4"
            />

            {/* Logo */}
            <div ref={logoRef} className="loading-logo">
                <Image
                    src="/images/icons/logo.png"
                    alt="InchScale"
                    width={120}
                    height={120}
                    priority
                />
            </div>

            {/* Percentage Counter */}
            <div ref={percentageRef} className="loading-percentage">
                {percentage}%
            </div>

            {/* Loading Text */}
            <div className="absolute bottom-8 text-center">
                <p className="text-sm tracking-[0.3em] uppercase text-accent opacity-60">
                    Crafting Excellence
                </p>
            </div>
        </div>
    );
}
