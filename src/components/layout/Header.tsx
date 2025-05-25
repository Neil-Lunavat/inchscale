"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    // Monitor scroll position
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    // Animation variants
    const headerVariants = {
        initial: {
            backgroundColor: "rgba(240, 233, 225, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 2px 20px rgba(46, 42, 38, 0.1)",
        },
        scrolled: {
            backgroundColor: "rgba(240, 233, 225, 0.95)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 4px 30px rgba(46, 42, 38, 0.15)",
        },
    };

    const logoVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 4.2, // After loading screen
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 4.4, // Slight stagger after logo
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    const menuItemVariants = {
        closed: { opacity: 0, x: -20 },
        open: (index: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.3,
                ease: "easeOut",
            },
        }),
    };

    const hamburgerLineVariants = {
        closed: { rotate: 0, y: 0 },
        open: { rotate: 45, y: 6 },
    };

    const hamburgerLine2Variants = {
        closed: { opacity: 1 },
        open: { opacity: 0 },
    };

    const hamburgerLine3Variants = {
        closed: { rotate: 0, y: 0 },
        open: { rotate: -45, y: -6 },
    };

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50"
            variants={headerVariants}
            initial="initial"
            animate={isScrolled ? "scrolled" : "initial"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <motion.div
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                    >
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
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.nav
                        className="hidden md:flex space-x-8"
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={item.href}
                                    className="text-dark hover:text-accent transition-colors duration-300 font-medium tracking-wide relative group"
                                >
                                    {item.name}
                                    <motion.span
                                        className="absolute bottom-0 left-0 h-0.5 bg-accent"
                                        initial={{ width: 0 }}
                                        whileHover={{ width: "100%" }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/book-consultation"
                                className="btn-primary px-6 py-2 rounded-none text-sm"
                            >
                                Book Consultation
                            </Link>
                        </motion.div>
                    </motion.nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.span
                            className="w-6 h-0.5 bg-dark"
                            variants={hamburgerLineVariants}
                            animate={isMenuOpen ? "open" : "closed"}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-dark"
                            variants={hamburgerLine2Variants}
                            animate={isMenuOpen ? "open" : "closed"}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="w-6 h-0.5 bg-dark"
                            variants={hamburgerLine3Variants}
                            animate={isMenuOpen ? "open" : "closed"}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    className="md:hidden overflow-hidden"
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate={isMenuOpen ? "open" : "closed"}
                >
                    <nav className="flex flex-col space-y-4 pb-6">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                custom={index}
                                variants={menuItemVariants}
                                initial="closed"
                                animate={isMenuOpen ? "open" : "closed"}
                            >
                                <Link
                                    href={item.href}
                                    className="text-dark hover:text-accent transition-colors duration-300 font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            custom={navItems.length}
                            variants={menuItemVariants}
                            initial="closed"
                            animate={isMenuOpen ? "open" : "closed"}
                        >
                            <Link
                                href="/book-consultation"
                                className="btn-primary px-6 py-2 rounded-none text-sm inline-block text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Book Consultation
                            </Link>
                        </motion.div>
                    </nav>
                </motion.div>
            </div>
        </motion.header>
    );
}
