import Image from "next/image";
import Link from "next/link";

export default function Home() {
return (
    <div className="flex flex-col min-h-screen">
    <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6 text-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Build ATS-Friendly Resumes with AI</h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create professional, tailored resumes in minutes with our AI-powered resume builder. Stand out to employers and increase your interview chances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
                href="/auth/signup" 
                className="px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
                Get Started For Free
            </Link>
            <Link
                href="/resume-builder"
                className="px-8 py-3 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                Try Demo
            </Link>
            </div>
        </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI Resume Builder</h2>
            <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">AI-Powered Optimization</h3>
                <p className="text-gray-600 dark:text-gray-300">
                Our AI analyzes job descriptions to optimize your resume with relevant keywords and phrases that ATS systems look for.
                </p>
            </div>
            <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Professional Templates</h3>
                <p className="text-gray-600 dark:text-gray-300">
                Choose from multiple ATS-friendly templates designed by HR professionals to maximize your chances.
                </p>
            </div>
            <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Instant Feedback</h3>
                <p className="text-gray-600 dark:text-gray-300">
                Get real-time suggestions to improve your resume's content, formatting, and overall impact.
                </p>
            </div>
            </div>
        </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6 bg-blue-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to land your dream job?</h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Join thousands of job seekers who have successfully secured interviews with our AI resume builder.
            </p>
            <Link 
            href="/auth/signup" 
            className="px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
            Create Your Resume Now
            </Link>
        </div>
        </section>
    </main>
    
    <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-300">© 2023 AI Resume Builder. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Privacy</Link>
            <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Terms</Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link>
        </div>
        </div>
    </footer>
    </div>
);
}
