import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import axios from "axios"
import { toast } from 'sonner';
import { getCurrentUserId } from '@/lib/userId';

interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    about?: string;
    skills?: string[];
    imageUrl?: string|null;
}

interface PopUpEditProps {
    user: UserType;
    onSave?: (userData: Partial<UserType>) => void;
    triggerText?: string;
}

function PopUpEdit({ user, onSave, triggerText = "Edit Profile" }: PopUpEditProps) {
    const userId = getCurrentUserId()
    
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        about: user.about || '',
        imageUrl: user.imageUrl || '',
        skills: user.skills || [],
        userId:userId
    });

    const [newSkill, setNewSkill] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.put(`http://localhost:3000/user/edit`, formData );

            const updatedUser = response.data;
            onSave?.(updatedUser);

            toast.success("User updated successfully ✅");
            console.log("User updated successfully:", updatedUser);
        } catch (error: any) {
            console.error("Error updating user:", error);

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to update user ❌");
            } else {
                toast.error("An unexpected error occurred ❌");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_black] font-bold hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_black] transition-all duration-200"
                >
                    {triggerText}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] max-h-[90vh] overflow-y-auto">
                <div onSubmit={handleSubmit}>
                    <DialogHeader className="border-b-4 border-black bg-yellow-400 -mx-6 -mt-6 px-6 py-4 mb-6">
                        <DialogTitle className="text-xl font-bold uppercase tracking-wider text-black">
                            Edit Profile
                        </DialogTitle>
                        <DialogDescription className="text-black font-medium">
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 px-2">
                      
                        <div className="grid gap-3">
                            <Label htmlFor="firstName" className="text-black font-bold text-sm uppercase tracking-wide">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className="border-2 border-black shadow-[2px_2px_0px_0px_black] focus:shadow-[4px_4px_0px_0px_black] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="grid gap-3">
                            <Label htmlFor="lastName" className="text-black font-bold text-sm uppercase tracking-wide">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className="border-2 border-black shadow-[2px_2px_0px_0px_black] focus:shadow-[4px_4px_0px_0px_black] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all"
                                required
                            />
                        </div>

                        {/* About */}
                        <div className="grid gap-3">
                            <Label htmlFor="about" className="text-black font-bold text-sm uppercase tracking-wide">
                                About
                            </Label>
                            <Textarea
                                id="about"
                                value={formData.about}
                                onChange={(e) => handleInputChange('about', e.target.value)}
                                placeholder="Tell us about yourself..."
                                className="border-2 border-black shadow-[2px_2px_0px_0px_black] focus:shadow-[4px_4px_0px_0px_black] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all min-h-[100px] resize-none"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="grid gap-3">
                            <Label htmlFor="imageUrl" className="text-black font-bold text-sm uppercase tracking-wide">
                                Profile Image URL
                            </Label>
                            <Input
                                id="imageUrl"
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="border-2 border-black shadow-[2px_2px_0px_0px_black] focus:shadow-[4px_4px_0px_0px_black] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all"
                            />
                        </div>

                        {/* Skills */}
                        <div className="grid gap-3">
                            <Label className="text-black font-bold text-sm uppercase tracking-wide">
                                Skills
                            </Label>

                            {/* Add New Skill */}
                            <div className="flex gap-2">
                                <Input
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add a skill..."
                                    className="border-2 border-black shadow-[2px_2px_0px_0px_black] focus:shadow-[4px_4px_0px_0px_black] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                />
                                <Button
                                    type="button"
                                    onClick={addSkill}
                                    className="bg-green-400 border-2 border-black shadow-[2px_2px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-black font-bold px-4"
                                >
                                    <Plus size={16} />
                                </Button>
                            </div>

                            {/* Skills List */}
                            {formData.skills.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                                    {formData.skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="bg-cyan-400 border-2 border-black shadow-[2px_2px_0px_0px_black] p-2 flex items-center justify-between"
                                        >
                                            <span className="text-black font-bold text-sm truncate">{skill}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="bg-red-400 border border-black p-1 hover:bg-red-500 transition-colors"
                                            >
                                                <X size={12} className="text-black" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="border-t-4 border-black bg-gray-100 -mx-6 -mb-6 px-6 py-4 mt-6 flex gap-3">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-bold"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            className="bg-blue-400 border-2 border-black shadow-[2px_2px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-black font-bold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PopUpEdit;