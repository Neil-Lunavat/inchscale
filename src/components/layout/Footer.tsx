import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        services: [
            { name: "Interior Design", href: "/services/interior-design" },
            {
                name: "Project Management",
                href: "/services/project-management",
            },
            { name: "Construction", href: "/services/construction" },
            { name: "Consultation", href: "/services/consultation" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Our Process", href: "/process" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/contact" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
        ],
    };

    const locations = [
        { city: "Pune", address: "Koregaon Park, Pune, Maharashtra" },
        { city: "Mumbai", address: "Available on request" },
        { city: "Delhi", address: "Available on request" },
        { city: "Bangalore", address: "Available on request" },
    ];

    return (
        <footer className="bg-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 mb-6"
                        >
                            <Image
                                src="/images/icons/logo.png"
                                alt="InchScale"
                                width={40}
                                height={40}
                                className="w-auto h-10"
                            />
                            <div>
                                <span className="text-xl font-playfair font-bold">
                                    InchScale
                                </span>
                                <p className="text-xs text-gray-400 tracking-wider uppercase">
                                    Design Studio
                                </p>
                            </div>
                        </Link>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Where your story meets interior excellence. Creating
                            luxury spaces that inspire and elevate everyday
                            experiences.
                        </p>

                        <div className="space-y-3">
                            <p className="text-gray-300">
                                <span className="font-medium">Email:</span>{" "}
                                <a
                                    href="mailto:srishti@inchscale.co.in"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    srishti@inchscale.co.in
                                </a>
                            </p>
                            <p className="text-gray-300">
                                <span className="font-medium">Phone:</span>{" "}
                                <a
                                    href="tel:+919175022711"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    +91 9175022711
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Services</h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Locations */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Locations</h3>
                        <div className="space-y-4">
                            {locations.map((location, index) => (
                                <div key={index}>
                                    <p className="font-medium text-primary">
                                        {location.city}
                                    </p>
                                    <p className="text-gray-300 text-sm">
                                        {location.address}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-700 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {currentYear} InchScale Design Studio. All rights
                            reserved.
                        </div>

                        <div className="flex space-x-6">
                            {footerLinks.legal.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-400 text-sm hover:text-primary transition-colors duration-300"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                        <p className="text-gray-400 text-sm">
                            "Never Back Down, Till The Last Moment" - Crafting
                            excellence in every detail.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
