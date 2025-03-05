// Basic types
export type ID = string;

// Personal Information
export interface PersonalInfo {
firstName: string;
lastName: string;
email: string;
phone: string;
address?: string;
city?: string;
state?: string;
zipCode?: string;
country?: string;
website?: string;
linkedin?: string;
github?: string;
jobTitle: string;
summary?: string;
profilePicture?: string;
}

// Work Experience
export interface Experience {
id: ID;
company: string;
jobTitle: string;
location?: string;
startDate: string;
endDate?: string;
current: boolean;
description: string;
achievements: string[];
keywords?: string[];
}

// Education
export interface Education {
id: ID;
institution: string;
degree: string;
field: string;
location?: string;
startDate: string;
endDate?: string;
current: boolean;
description?: string;
gpa?: string;
achievements?: string[];
}

// Skills
export interface Skill {
category: string;
skills: string[];
}

// Projects
export interface Project {
id: ID;
name: string;
description: string;
startDate?: string;
endDate?: string;
current?: boolean;
url?: string;
technologies: string[];
achievements?: string[];
}

// Certifications
export interface Certification {
id: ID;
name: string;
issuer: string;
date: string;
expiry?: string;
url?: string;
description?: string;
}

// Languages
export interface Language {
language: string;
proficiency: "Native" | "Fluent" | "Proficient" | "Intermediate" | "Basic";
}

// References
export interface Reference {
id: ID;
name: string;
company: string;
position: string;
email?: string;
phone?: string;
relationship?: string;
}

// Additional Sections
export interface AdditionalSection {
id: ID;
title: string;
content: string;
}

// Main Resume Data Type
export interface ResumeData {
id: ID;
title: string;
lastModified: string;
createdAt: string;
personalInfo: PersonalInfo;
experience: Experience[];
education: Education[];
skills: Skill[];
projects?: Project[];
certifications?: Certification[];
languages?: Language[];
references?: Reference[];
additionalSections?: AdditionalSection[];
templateId: string;
isPublic: boolean;
}

// Resume Template
export interface ResumeTemplate {
id: ID;
name: string;
thumbnail: string;
isPremium: boolean;
category: "Professional" | "Creative" | "Simple" | "Modern" | "ATS-Friendly";
}

// Form Field Types
export interface FormField {
name: string;
label: string;
type: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select" | "radio" | "checkbox" | "file" | "skills";
placeholder?: string;
required?: boolean;
helperText?: string;
options?: { value: string; label: string }[];
validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
};
}

// User Types
export interface User {
id: ID;
email: string;
name: string;
avatar?: string;
createdAt: string;
subscription: "free" | "premium";
expiresAt?: string;
}

// Job Type (for job matching)
export interface Job {
id: ID;
title: string;
company: string;
location: string;
description: string;
requirements: string[];
datePosted: string;
url?: string;
keywords: string[];
}

// API Response Types
export interface ApiResponse<T = any> {
success: boolean;
data?: T;
error?: string;
message?: string;
}

