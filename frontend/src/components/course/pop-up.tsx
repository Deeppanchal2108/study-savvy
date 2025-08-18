import React, { useState } from "react"
import { Button } from "@/components/ui/button"
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
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
export function PopUp() {
    // form states

    const router = useNavigate()

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
        "Finalizing...",
    ]

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setIsOpen(false)
        setIsLoading(true)

        try {
            const payload = { title, description, experience, knowledge, difficulty }
            console.log("Sending data...", payload)

            // call backend (your Express endpoint)
            const res = await axios.post("http://localhost:3000/course/create-course", payload)

            if (res.data?.course) {
                toast.success("Course created successfully!")
                const createdCourse = res.data.course

                // redirect to that course page
                router(`/course/${createdCourse.id}`)
            } else {
                toast.error("Something went wrong while creating the course.")
            }
        } catch (error: any) {
            console.error("Save failed", error)
            toast.error(error.response?.data?.message || "Failed to create course. Please try again.")
        } finally {
            setIsLoading(false)
            setCurrentStepIndex(0)

            // reset form fields
            setTitle("")
            setDescription("")
            setExperience("")
            setKnowledge("")
            setDifficulty("")
        }
    }

    return (
        <>
            {/* Main Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className="px-6 py-3 bg-destructive text-destructive-foreground border-4 border-black font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 rounded-none">
                        CREATE COURSE
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
                    <div className="grid grid-cols-2 h-[600px]">
                        {/* Left Side */}
                        <div className="bg-gradient-to-br from-chart-3 to-chart-4 flex flex-col items-center justify-center border-r-4 border-black">
                            <div className="text-center">
                                <div className="w-48 h-48 bg-muted border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 flex items-center justify-center">
                                    <span className="font-mono font-bold text-4xl text-muted-foreground">IMG</span>
                                </div>
                                <Button className="bg-secondary text-secondary-foreground px-6 py-3 font-mono font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-none">
                                    UPLOAD IMAGE
                                </Button>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b-4 border-black">
                                <DialogHeader>
                                    <DialogTitle className="font-sans text-2xl font-black text-foreground mb-2">
                                        CREATE COURSE
                                    </DialogTitle>
                                    <DialogDescription className="text-muted-foreground font-mono text-sm">
                                        Build your next educational masterpiece
                                    </DialogDescription>
                                </DialogHeader>
                            </div>

                            {/* Form */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label
                                            htmlFor="title"
                                            className="block font-mono font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-foreground"
                                        >
                                            TITLE
                                        </Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Course title"
                                            className="border-2 sm:border-4 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-input text-foreground font-mono text-sm rounded-none"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label
                                            htmlFor="description"
                                            className="block font-mono font-bold text-xs sm:text-sm mb-1 sm:mb-2 text-foreground"
                                        >
                                            DESCRIPTION
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Course description"
                                            className="border-2 sm:border-4 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-input text-foreground font-mono h-20 resize-none rounded-none text-sm"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="block font-mono font-bold text-xs sm:text-sm mb-2 text-foreground">
                                                LEVEL
                                            </Label>
                                            <Select onValueChange={setExperience} value={experience}>
                                                <SelectTrigger className="border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-input text-foreground font-mono rounded-none text-sm">
                                                    <SelectValue placeholder="Experience" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="beginner" className="font-mono text-sm">
                                                        BEGINNER
                                                    </SelectItem>
                                                    <SelectItem value="intermediate" className="font-mono text-sm">
                                                        INTERMEDIATE
                                                    </SelectItem>
                                                    <SelectItem value="advanced" className="font-mono text-sm">
                                                        ADVANCED
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="block font-mono font-bold text-xs sm:text-sm mb-2 text-foreground">
                                                DIFFICULTY
                                            </Label>
                                            <Select onValueChange={setDifficulty} value={difficulty}>
                                                <SelectTrigger className="border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-input text-foreground font-mono rounded-none text-sm">
                                                    <SelectValue placeholder="Difficulty" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="easy" className="font-mono text-sm">
                                                        EASY
                                                    </SelectItem>
                                                    <SelectItem value="medium" className="font-mono text-sm">
                                                        MEDIUM
                                                    </SelectItem>
                                                    <SelectItem value="hard" className="font-mono text-sm">
                                                        HARD
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="block font-mono font-bold text-xs sm:text-sm mb-2 text-foreground">
                                            PREREQUISITES
                                        </Label>
                                        <Input
                                            id="knowledge"
                                            value={knowledge}
                                            onChange={(e) => setKnowledge(e.target.value)}
                                            placeholder="Required knowledge"
                                            className="border-2 sm:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-input text-foreground font-mono text-sm rounded-none"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <DialogFooter className="px-6 py-4 border-t-4 border-black">
                                <DialogClose asChild>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        className="px-6 py-3 bg-muted text-muted-foreground font-mono font-bold border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all rounded-none"
                                    >
                                        CANCEL
                                    </Button>
                                </DialogClose>
                                <Button
                                    onClick={handleSubmit}
                                    className="px-6 py-3 bg-primary text-primary-foreground font-mono font-bold border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all rounded-none"
                                >
                                    CREATE COURSE
                                </Button>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Neo-Brutalist Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 bg-background flex flex-col items-center justify-center space-y-8 z-50">
                    <div className="bg-card border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-12 text-center max-w-md">
                        <div className="text-muted-foreground font-mono text-lg opacity-40 mb-3">
                            {steps[currentStepIndex - 1] || ""}
                        </div>

                        <div className="text-foreground font-sans text-3xl font-black mb-3">
                            {steps[currentStepIndex]}
                        </div>

                        <div className="text-muted-foreground font-mono text-lg opacity-70 mb-6">
                            {steps[currentStepIndex + 1] || "COMPLETE!"}
                        </div>

                        <div className="w-full h-4 bg-muted border-4 border-black">
                            <div
                                className="h-full bg-primary transition-all duration-1000 border-r-2 border-black"
                                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                            />
                        </div>

                        <div className="font-mono font-bold text-sm mt-4 text-muted-foreground">
                            {currentStepIndex + 1} / {steps.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
