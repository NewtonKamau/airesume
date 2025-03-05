"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/form/FormField";
import { Resume } from "@/types";

export default function NewResumePage() {
const router = useRouter();
const [formData, setFormData] = useState<Partial<Resume>>({
    title: "",
    personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    },
});
const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
) => {
    const { value } = e.target;
    
    if (field.includes(".")) {
    const [section, subField] = field.split(".");
    setFormData({
        ...formData,
        [section]: {
        ...formData[section as keyof Resume],
        [subField]: value,
        },
    });
    } else {
    setFormData({
        ...formData,
        [field]: value,
    });
    }

    // Clear error when field is updated
    if (errors[field]) {
    setErrors({
        ...errors,
        [field]: "",
    });
    }
};

const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title || formData.title.trim() === "") {
    newErrors.title = "Resume title is required";
    }
    
    if (!formData.personalInfo?.firstName || formData.personalInfo.firstName.trim() === "") {
    newErrors["personalInfo.firstName"] = "First name is required";
    }
    
    if (!formData.personalInfo?.lastName || formData.personalInfo.lastName.trim() === "") {
    newErrors["personalInfo.lastName"] = "Last name is required";
    }
    
    if (!formData.personalInfo?.email || formData.personalInfo.email.trim() === "") {
    newErrors["personalInfo.email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
    newErrors["personalInfo.email"] = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
    // Store the resume data (could be in localStorage, context, or server)
    localStorage.setItem("currentResume", JSON.stringify(formData));
    
    // Navigate to the next step
    router.push("/resume-builder/templates");
    }
};

return (
    <div className="max-w-3xl mx-auto p-6">
    <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create a New Resume</h1>
        <p className="text-gray-600">
        Let's start by setting up the basic information for your new resume.
        </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resume Details</h2>
        
        <FormField
            label="Resume Title"
            type="text"
            id="title"
            placeholder="e.g., Software Developer Resume"
            value={formData.title || ""}
            onChange={(e) => handleChange(e, "title")}
            error={errors.title}
        />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            label="First Name"
            type="text"
            id="firstName"
            placeholder="John"
            value={formData.personalInfo?.firstName || ""}
            onChange={(e) => handleChange(e, "personalInfo.firstName")}
            error={errors["personalInfo.firstName"]}
            />
            
            <FormField
            label="Last Name"
            type="text"
            id="lastName"
            placeholder="Doe"
            value={formData.personalInfo?.lastName || ""}
            onChange={(e) => handleChange(e, "personalInfo.lastName")}
            error={errors["personalInfo.lastName"]}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
            label="Email"
            type="email"
            id="email"
            placeholder="john.doe@example.com"
            value={formData.personalInfo?.email || ""}
            onChange={(e) => handleChange(e, "personalInfo.email")}
            error={errors["personalInfo.email"]}
            />
            
            <FormField
            label="Phone Number"
            type="tel"
            id="phone"
            placeholder="(123) 456-7890"
            value={formData.personalInfo?.phone || ""}
            onChange={(e) => handleChange(e, "personalInfo.phone")}
            error={errors["personalInfo.phone"]}
            />
        </div>
        </div>

        <div className="flex justify-end">
        <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Next: Choose Template
        </button>
        </div>
    </form>
    </div>
);
}

