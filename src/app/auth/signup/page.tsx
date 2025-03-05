"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
const router = useRouter();
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
});
const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
});
const [isLoading, setIsLoading] = useState(false);

const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "" };

    // Name validation
    if (!formData.name.trim()) {
    newErrors.name = "Name is required";
    valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
    valid = false;
    }

    // Password validation
    if (!formData.password) {
    newErrors.password = "Password is required";
    valid = false;
    } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
    valid = false;
    }

    setErrors(newErrors);
    return valid;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
    // This is a placeholder for the actual API call
    // Replace with your actual signup logic
    console.log("Form submitted:", formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to login page upon successful signup
    router.push("/auth/login");
    } catch (error) {
    console.error("Signup error:", error);
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
        <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
            </Link>
        </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
            <label htmlFor="name" className="sr-only">
                Full Name
            </label>
            <input
                id="name"
                name="name"
                type="text"
                required
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                errors.name ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
            />
            {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="sr-only">
                Email address
            </label>
            <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
            />
            {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="sr-only">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
            </div>
        </div>

        <div>
            <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
            {isLoading ? "Creating account..." : "Sign up"}
            </button>
        </div>
        </form>
    </div>
    </div>
);
}

