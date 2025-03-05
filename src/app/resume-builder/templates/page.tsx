"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Resume } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TemplateOption {
id: string;
name: string;
thumbnail: string;
description: string;
}

const templateOptions: TemplateOption[] = [
{
    id: "minimalist",
    name: "Minimalist",
    thumbnail: "/templates/minimalist.png",
    description: "Clean and simple design with minimal elements."
},
{
    id: "professional",
    name: "Professional",
    thumbnail: "/templates/professional.png",
    description: "Formal design with traditional structure."
},
{
    id: "creative",
    name: "Creative",
    thumbnail: "/templates/creative.png",
    description: "Unique layout with colorful accents."
},
{
    id: "modern",
    name: "Modern",
    thumbnail: "/templates/modern.png",
    description: "Contemporary design with sleek typography."
},
{
    id: "academic",
    name: "Academic",
    thumbnail: "/templates/academic.png",
    description: "Structured format for educational backgrounds."
},
{
    id: "technical",
    name: "Technical",
    thumbnail: "/templates/technical.png",
    description: "Focused on technical skills and projects."
}
];

export default function TemplatesPage() {
const router = useRouter();
const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
};

const handleContinue = () => {
    if (selectedTemplate) {
    // Navigate to the next step with the selected template
    router.push(`/resume-builder/customize?template=${selectedTemplate}`);
    }
};

return (
    <div className="container mx-auto py-8">
    <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose a Resume Template</h1>
        <p className="text-gray-600">
        Select a template that best represents your professional style.
        </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templateOptions.map((template) => (
        <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedTemplate === template.id ? 'ring-2 ring-primary scale-[1.02]' : ''
            }`}
            onClick={() => handleTemplateSelect(template.id)}
        >
            <CardContent className="p-4">
            <div className="relative w-full h-64 mb-3 bg-gray-100 rounded-md overflow-hidden">
                <Image 
                src={template.thumbnail}
                alt={template.name}
                layout="fill"
                objectFit="cover"
                />
            </div>
            <h3 className="text-xl font-semibold">{template.name}</h3>
            <p className="text-gray-500 mt-1">{template.description}</p>
            </CardContent>
        </Card>
        ))}
    </div>

    <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
        Back
        </Button>
        <Button 
        onClick={handleContinue}
        disabled={!selectedTemplate}
        >
        Continue
        </Button>
    </div>
    </div>
);
}

