import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
});

export const metadata: Metadata = {
title: "AI Resume Builder - Create ATS-Friendly Resumes",
description: "Build professional, ATS-optimized resumes with our AI-powered resume builder. Get more interviews with tailored resumes for any job.",
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
    <html lang="en">
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
        <div className="flex flex-col min-h-screen">
        <header className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                <Link href="/" className="font-bold text-xl">
                    AI Resume Builder
                </Link>
                </div>
                <nav className="hidden md:flex space-x-8">
                <Link
                    href="/resume-builder"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                    Create Resume
                </Link>
                <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                    Dashboard
                </Link>
                <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                    Pricing
                </Link>
                </nav>
        
