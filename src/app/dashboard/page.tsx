"use client";

import Link from "next/link";
import React from "react";

export default function DashboardPage() {
// Mock data for resumes (would come from API/database in a real app)
const mockResumes = [
    { id: 1, title: "Software Engineer Resume", lastUpdated: "2023-05-15" },
    { id: 2, title: "Product Manager Resume", lastUpdated: "2023-06-20" },
    { id: 3, title: "UX Designer Resume", lastUpdated: "2023-07-10" },
    { id: 4, title: "Data Scientist Resume", lastUpdated: "2023-08-05" },
];

return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-8">
        <div>
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <p className="text-gray-600">Manage and create professional resumes</p>
        </div>
        <Link
        href="/resume-builder/new"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
        Create New Resume
        </Link>
    </div>

    {mockResumes.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
        <p className="text-gray-600 mb-4">
            Create your first resume to get started
        </p>
        <Link
            href="/resume-builder/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
            Create Resume
        </Link>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockResumes.map((resume) => (
            <div
            key={resume.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
            <h2 className="text-xl font-semibold mb-2">{resume.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
                Last updated: {resume.lastUpdated}
            </p>
            <div className="flex space-x-3 mt-4">
                <Link
                href={`/resume-builder/${resume.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                Edit
                </Link>
                <Link
                href={`/resume-builder/${resume.id}/preview`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                Preview
                </Link>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Delete
                </button>
            </div>
            </div>
        ))}
        </div>
    )}
    </div>
);
}

