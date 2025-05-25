import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "InchScale - Where Your Story Meets Interior Excellence",
    description:
        "InchScale is a full-service design and build studio creating luxury interior spaces that bring stories to life. Professional interior design in Pune, Mumbai, Delhi, Bangalore.",
    keywords:
        "interior design, luxury interiors, office design, residential design, pune interior designer, commercial interiors",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${playfair.variable} font-sans`}
            >
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
