"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select";
import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Resume } from "@/types";

const CustomizePage = () => {
const searchParams = useSearchParams();
const router = useRouter();
const templateId = searchParams.get("templateId");
const [resumeData, setResumeData] = useState<Resume | null>(null);

// Customization state
const [customizations, setCustomizations] = useState({
    colors: {
    primary: "#0369a1",
    secondary: "#f4f4f5",
    text: "#18181b",
    accent: "#0284c7",
    },
    typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    headingSize: 18,
    bodySize: 14,
    lineHeight: 1.5,
    },
    spacing: {
    sectionSpacing: 24,
    itemSpacing: 16,
    padding: 32,
    },
    layout: {
    columns: 1,
    headerStyle: "standard",
    sectionStyle: "boxed",
    },
});

useEffect(() => {
    // In a real app, fetch the resume data from localStorage or an API
    const storedResume = localStorage.getItem("resumeData");
    if (storedResume) {
    setResumeData(JSON.parse(storedResume));
    }
    
    // In a real app, you might fetch template details based on templateId
    console.log(`Customizing template with ID: ${templateId}`);
}, [templateId]);

const handleColorChange = (colorKey: string, value: string) => {
    setCustomizations({
    ...customizations,
    colors: {
        ...customizations.colors,
        [colorKey]: value,
    },
    });
};

const handleTypographyChange = (typographyKey: string, value: any) => {
    setCustomizations({
    ...customizations,
    typography: {
        ...customizations.typography,
        [typographyKey]: value,
    },
    });
};

const handleSpacingChange = (spacingKey: string, value: number) => {
    setCustomizations({
    ...customizations,
    spacing: {
        ...customizations.spacing,
        [spacingKey]: value,
    },
    });
};

const handleLayoutChange = (layoutKey: string, value: any) => {
    setCustomizations({
    ...customizations,
    layout: {
        ...customizations.layout,
        [layoutKey]: value,
    },
    });
};

const handleSaveAndContinue = () => {
    // Save customizations
    localStorage.setItem("templateCustomizations", JSON.stringify(customizations));
    
    // Navigate to the next step in the resume creation flow
    router.push(`/resume-builder/finalize?templateId=${templateId}`);
};

return (
    <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-6">Customize Your Resume</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Preview Panel */}
        <div className="md:col-span-2">
        <Card className="mb-6">
            <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div 
                className="border rounded-md h-[800px] overflow-auto p-4"
                style={{
                backgroundColor: customizations.colors.secondary,
                color: customizations.colors.text,
                fontFamily: customizations.typography.bodyFont,
                fontSize: `${customizations.typography.bodySize}px`,
                lineHeight: customizations.typography.lineHeight,
                }}
            >
                {resumeData ? (
                <div className="resume-preview">
                    {/* This would be replaced with an actual resume preview component */}
                    <div 
                    style={{
                        backgroundColor: customizations.colors.primary,
                        color: "white",
                        padding: `${customizations.spacing.padding / 2}px`,
                        marginBottom: `${customizations.spacing.sectionSpacing}px`,
                    }}
                    >
                    <h1 style={{ 
                        fontSize: `${customizations.typography.headingSize + 8}px`,
                        fontFamily: customizations.typography.headingFont,
                        marginBottom: "8px"
                    }}>
                        {resumeData.personal?.name || "Your Name"}
                    </h1>
                    <p>{resumeData.personal?.title || "Professional Title"}</p>
                    </div>
                    
                    <div style={{ padding: `0 ${customizations.spacing.padding}px` }}>
                    {/* Sections would be rendered here based on resume data */}
                    <div style={{ marginBottom: `${customizations.spacing.sectionSpacing}px` }}>
                        <h2 style={{ 
                        fontSize: `${customizations.typography.headingSize}px`,
                        fontFamily: customizations.typography.headingFont,
                        color: customizations.colors.primary,
                        marginBottom: `${customizations.spacing.itemSpacing}px`
                        }}>
                        Experience
                        </h2>
                        
                        {resumeData.experience?.map((exp, index) => (
                        <div 
                            key={index}
                            style={{ 
                            marginBottom: `${customizations.spacing.itemSpacing}px`,
                            padding: customizations.layout.sectionStyle === "boxed" ? "12px" : "0",
                            border: customizations.layout.sectionStyle === "boxed" ? "1px solid #e2e8f0" : "none",
                            borderRadius: customizations.layout.sectionStyle === "boxed" ? "4px" : "0",
                            }}
                        >
                            <h3 style={{ fontWeight: "bold" }}>{exp.position}</h3>
                            <p>{exp.company} | {exp.startDate} - {exp.endDate}</p>
                            <p>{exp.description}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                ) : (
                <div className="flex items-center justify-center h-full">
                    <p>Loading resume preview...</p>
                </div>
                )}
            </div>
            </CardContent>
        </Card>
        </div>
        
        {/* Customization Panel */}
        <div>
        <Card>
            <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Customization Options</h2>
            
            <Tabs defaultValue="colors">
                <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="spacing">Spacing</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="space-y-4">
                <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                    <Input
                        id="primaryColor"
                        type="color"
                        value={customizations.colors.primary}
                        className="w-12 h-10"
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                    />
                    <Input
                        type="text"
                        value={customizations.colors.primary}
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                        className="font-mono"
                    />
                    </div>
                </div>
                
                <div>
                    <Label htmlFor="secondaryColor">Background Color</Label>
                    <div className="flex items-center gap-2">
                    <Input
                        id="secondaryColor"
                        type="color"
                        value={customizations.colors.secondary}
                        className="w-12 h-10"
                        onChange={(e) => handleColorChange("secondary", e.target.value)}
                    />
                    <Input
                        type="text"
                        value={customizations.colors.secondary}
                        onChange={(e) => handleColorChange("secondary", e.target.value)}
                        className="font-mono"
                    />
                    </div>
                </div>
                
                <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex items-center gap-2">
                    <Input
                        id="textColor"
                        type="color"
                        value={customizations.colors.text}
                        className="w-12 h-10"
                        onChange={(e) => handleColorChange("text", e.target.value)}
                    />
                    <Input
                        type="text"
                        value={customizations.colors.text}
                        onChange={(e) => handleColorChange("text", e.target.value)}
                        className="font-mono"
                    />
                    </div>
                </div>
                
                <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center gap-2">
                    <Input
                        id="accentColor"
                        type="color"
                        value={customizations.colors.accent}
                        className="w-12 h-10"
                        onChange={(e) => handleColorChange("accent", e.target.value)}
                    />
                    <Input
                        type="text"
                        value={customizations.colors.accent}
                        onChange={(e) => handleColorChange("accent", e.target.value)}
                        className="font-mono"
                    />
                    </div>
                </div>
                </TabsContent>
                
                <TabsContent value="typography" className="space-y-4">
                <div>
                    <Label htmlFor="headingFont">Heading Font</Label>
                    <Select 
                    value={customizations.typography.headingFont}
                    onValueChange={(value) => handleTypographyChange("headingFont", value)}
                    >
                    <SelectTrigger id="headingFont">
                        <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                
                <div>
                    <Label htmlFor="bodyFont">Body Font</Label>
                    <Select 
                    value={customizations.typography.bodyFont}
                    onValueChange={(value) => handleTypographyChange("bodyFont", value)}
                    >
                    <SelectTrigger id="bodyFont">
                        <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                
                <div>
                    <Label htmlFor="headingSize">Heading Size: {customizations.typography.headingSize}px</Label>
                    <Slider 
                    id="headingSize"
                    min={14} 
                    max={32} 
                    step={1}
                    value={[customizations.typography.headingSize]}
                    onValueChange={(value) => handleTypographyChange("headingSize", value[0])}
                    className="my-2"
                    />
                </div>
                
                <div>
                    <Label htmlFor="bodySize">Body Size: {customizations.typography.bodySize}px</Label>
                    <Slider 
                    id="bodySize"
                    min={10} 
                    max={18} 
                    step={1}
                    value={[customizations.typography.bodySize]}
                    onValueChange={(value) => handleTypographyChange("bodySize", value[0])}
                    className="my-2"
                    />
                </div>
                
                <div>
                    <Label htmlFor="lineHeight">Line Height: {customizations.typography.lineHeight}</Label>
                    <Slider 
                    id="lineHeight"
                    min={1} 
                    max={2} 
                    step={0.1}
                    value={[customizations.typography.lineHeight]}
                    onValueChange={(value) => handleTypographyChange("lineHeight", value[0])}
                    className="my-2"
                    />
                </div>
                </TabsContent>
                
                <TabsContent value="spacing" className="space-y-4">
                <div>
                    <Label htmlFor="sectionSpacing">Section Spacing: {customizations.spacing.sectionSpacing}px</Label>
                    <Slider 
                    id="sectionSpacing"
                    min={8} 
                    max={64} 
                    step={4}
                    value={[customizations.spacing.sectionSpacing]}
                    onValueChange={(value) => handleSpacingChange("sectionSpacing", value[0])}
                    className="my-2"
                    />
                </div>
                
                <div>
                    <Label htmlFor="itemSpacing">Item Spacing: {customizations.spacing.itemSpacing}px</Label>
                    <Slider 
                    i

