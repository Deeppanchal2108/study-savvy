import React from 'react'
import { BookOpen, MessageSquare, Video, Brain, Bot, FileText } from 'lucide-react'

function FeatureSection() {
    const features = [
        {
            title: "Course Creation",
            description: "AI-powered course generation tailored to your learning objectives and pace",
            icon: BookOpen,
            bgColor: "bg-chart-1",
            textColor: "text-foreground"
        },
        {
            title: "Smart Quizzes",
            description: "Interactive quizzes that adapt to your knowledge level and learning progress",
            icon: Brain,
            bgColor: "bg-chart-2",
            textColor: "text-foreground"
        },
        {
            title: "Flashcards",
            description: "Dynamic flashcard system with spaced repetition for optimal memory retention",
            icon: MessageSquare,
            bgColor: "bg-chart-3",
            textColor: "text-foreground"
        },
        {
            title: "YouTube Summaries",
            description: "Instant AI summaries of educational videos to save time and extract key insights",
            icon: Video,
            bgColor: "bg-chart-4",
            textColor: "text-foreground"
        },
        {
            title: "Course Summary",
            description: "Comprehensive course summaries that condense complex topics into digestible insights",
            icon: FileText,
            bgColor: "bg-secondary",
            textColor: "text-secondary-foreground"
        },
        {
            title: "AI Chatbot",
            description: "24/7 intelligent study companion to answer questions and provide guidance",
            icon: Bot,
            bgColor: "bg-chart-5",
            textColor: "text-foreground"
        }
    ]

    return (
        <div className="bg-background py-16">
            <div className="max-w-full ">
             
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <div
                                key={index}
                                className={`${feature.bgColor} ${feature.textColor} border-2 border-foreground p-8 shadow-sm hover:shadow-md transition-shadow`}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <IconComponent size={40} className="text-foreground" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-foreground opacity-90 flex-grow">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FeatureSection