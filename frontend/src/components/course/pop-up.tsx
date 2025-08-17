import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function PopUp() {
    // form states
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [experience, setExperience] = useState("")
    const [knowledge, setKnowledge] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const steps = [
        "Creating course...",
        "Adding topics...",
        "Adding pages...",
        "Adding quizzes...",
        "Adding flashcards...",
        "Adding summary...",
        "Finalizing..."
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsOpen(false)
        setIsLoading(true)

        try {
            const payload = { title, description, experience, knowledge, difficulty }
            console.log("Sending data...", payload)

            const res = await axios.post("http://localhost:3000/course/create-course", payload)

            for (let i = 0; i < steps.length; i++) {
                setCurrentStepIndex(i)
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }

            console.log("Course saved successfully!", res.data)

            toast.success(res.data?.message || "Course created successfully!")

           
        } catch (error: any) {
            console.error("Save failed", error)

            toast.error(
                error.response?.data?.message || "Failed to create course. Please try again."
            )
        } finally {
            setIsLoading(false)
            setCurrentStepIndex(0)

            setTitle("")
            setDescription("")
            setExperience("")
            setKnowledge("")
            setDifficulty("")
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Course</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
                    {/* Header */}
                    <div className="px-6 pt-4 pb-2">
                        <DialogHeader>
                            <DialogTitle>Create Course</DialogTitle>
                            <DialogDescription>
                                Provide details about your course and upload an image.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-2 h-[500px]">
                        {/* Left Placeholder */}
                        <div className="bg-gray-100 flex items-center justify-center text-gray-500">
                            Image Upload Placeholder
                        </div>

                        {/* Right Fields */}
                        <div className="p-6 overflow-y-auto">
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter course title"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter course description"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="experience">Experience</Label>
                                    <Select onValueChange={setExperience} value={experience}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="knowledge">Knowledge</Label>
                                    <Input
                                        id="knowledge"
                                        value={knowledge}
                                        onChange={(e) => setKnowledge(e.target.value)}
                                        placeholder="Prerequisites"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="difficulty">Difficulty</Label>
                                    <Select onValueChange={setDifficulty} value={difficulty}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <DialogFooter className="px-6 py-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Full screen loader with 3 states */}
            {isLoading && (
                <div className="fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 z-50">
                    {/* top - fading out */}
                    <div className="text-slate-400 text-lg opacity-40 animate-pulse">
                        {steps[currentStepIndex - 1] || ""}
                    </div>

                    {/* middle - stable */}
                    <div className="text-slate-700 text-2xl font-semibold">
                        {steps[currentStepIndex]}
                    </div>

                    {/* bottom - appearing */}
                    <div className="text-slate-500 text-lg opacity-70 animate-bounce">
                        {steps[currentStepIndex + 1] || ""}
                    </div>
                </div>
            )}
        </>
    )
}
