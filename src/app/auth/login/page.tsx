"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
const router = useRouter();
const [formData, setFormData] = useState({
    email: '',
    password: '',
});
const [errors, setErrors] = useState({
    email: '',
    password: '',
});
const [isLoading, setIsLoading] = useState(false);

const validateForm = () => {
    let valid = true;
    const newErrors = {
    email: '',
    password: '',
    };

    // Email validation
    if (!formData.email) {
    newErrors.email = 'Email is required';
    valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
    valid = false;
    }

    // Password validation
    if (!formData.password) {
    newErrors.password = 'Password is required';
    valid = false;
    }

    setErrors(newErrors);
    return valid;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
    ...formData,
    [name]: value,
    });
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
    setIsLoading(true);
    
    try {
        // Here you would typically make an API call to authenticate the user
        // For now, we'll just simulate a login
        console.log('Login attempt with:', formData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to dashboard after successful login
        router.push('/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
    } finally {
        setIsLoading(false);
    }
    }
};

return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div className="w-full max-w-md space-y-8">
        <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
            </Link>
        </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
            </label>
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
            </div>
            
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
            />
            {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            </div>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center">
            <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
            </label>
            </div>

            <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
            </a>
            </div>
        </div>

        <div>
            <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
            >
            {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
        </div>
        </form>
    </div>
    </div>
);
}

