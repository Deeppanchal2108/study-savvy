
import {
    Upload,
    Brain,
    BookOpen,
    TrendingUp,
    MessageSquare,
    
    ArrowDown
} from 'lucide-react'

function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Upload + Tell Us About It',
            description:
                'Upload videos, notes, or links and add a short topic title, description, and your current experience level. This helps the AI personalize learning.',
            icon: Upload,
            visual: 'form',
            bgColor: 'bg-chart-1'
        },
        {
            number: '02',
            title: 'AI Analyzes & Personalizes',
            description:
                'Our AI parses your materials and the details you provided, identifies learning goals and gaps, and creates a tailored plan.',
            icon: Brain,
            visual: 'tile',
            bgColor: 'bg-chart-2'
        },
        {
            number: '03',
            title: 'Auto-generate Course & Materials',
            description:
                'Get a structured course, interactive quizzes, flashcards, and concise YouTube-style summaries generated from your content.',
            icon: BookOpen,
            visual: 'tile',
            bgColor: 'bg-chart-3'
        },
        {
            number: '04',
            title: 'Ask the Chatbot',
            description:
                'Use the built-in chatbot for quick explanations, follow-up questions, or customized study advice while you learn.',
            icon: MessageSquare,
            visual: 'tile',
            bgColor: 'bg-chart-4'
        },
        {
            number: '05',
            title: 'Track Your Learning Journey',
            description:
                'Monitor progress, quiz scores, and retention over time so the system adapts and spots areas that need more practice.',
            icon: TrendingUp,
            visual: 'tile',
            bgColor: 'bg-chart-5'
        }
    ]

    return (
        <div className="bg-background pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 font-mono tracking-tighter">
                        How It Works
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Upload one set of materials and a few details — we'll turn it into a full,
                        personalized study plan with quizzes, flashcards, summaries and support.
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-16">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon
                        const isEven = index % 2 === 1

                        return (
                            <div key={index} className="relative">
                            
                                <div
                                    className={`grid lg:grid-cols-5 gap-12 items-center ${isEven ? 'lg:grid-flow-col-reverse' : ''
                                        }`}
                                >
                            
                                    <div className="lg:col-span-3 space-y-6">
                                        <div className="flex items-start gap-6">
                                            <div className="w-20 h-20 bg-foreground text-background flex items-center justify-center border-4 border-foreground shadow-lg flex-shrink-0">
                                                <span className="text-2xl font-bold font-mono">
                                                    {step.number}
                                                </span>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-bold text-foreground leading-tight">
                                                    {step.title}
                                                </h3>
                                                <p className="text-lg text-muted-foreground leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
=
                                    <div className="lg:col-span-2 flex justify-center">
                                        {step.visual === 'form' ? (
                                            <div className="w-80 h-72 bg-card border-4 border-foreground shadow-xl p-6 flex flex-col justify-start gap-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <IconComponent size={32} className="text-foreground" />
                                                    <span className="font-bold text-xl text-foreground">Upload Content</span>
                                                </div>

                                       
                                                <div className="space-y-3 w-full">
                                                    <div className="h-10 bg-input border-2 border-foreground px-4 flex items-center text-sm text-muted-foreground shadow-sm">
                                                        Topic: "Linear Algebra: Vectors"
                                                    </div>
                                                    <div className="h-10 bg-input border-2 border-foreground px-4 flex items-center text-sm text-muted-foreground shadow-sm">
                                                        Description...
                                                    </div>
                                                    <div className="h-10 bg-input border-2 border-foreground px-4 flex items-center text-sm text-muted-foreground shadow-sm">
                                                        Level: Intermediate
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="w-full px-4 py-3 bg-destructive text-destructive-foreground border-2 border-foreground font-bold shadow-sm hover:opacity-80 transition-opacity">
                                                        Upload & Continue
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={`${step.bgColor} w-72 h-72 border-4 border-foreground shadow-xl flex flex-col items-center justify-center p-8 transform ${isEven ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-transform duration-300`}>
                                                <IconComponent size={80} className="text-foreground mb-6" />
                                                <span className="text-center text-lg font-bold text-foreground leading-tight">
                                                    {step.title}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="flex justify-center my-12">
                                        <div className="bg-foreground p-3 border-2 border-foreground shadow-md">
                                            <ArrowDown size={36} className="text-background" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="text-center mt-20">
                    <div className="inline-block transform hover:-translate-y-2 transition-transform duration-300">
                        <button className="px-16 py-6 bg-destructive text-destructive-foreground border-4 border-foreground font-bold text-2xl shadow-xl hover:shadow-2xl transition-shadow">
                            Start Your Personalized Course
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HowItWorks