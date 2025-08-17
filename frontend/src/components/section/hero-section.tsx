
function HeroSection() {
    return (
        <div className="bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  
                    <div className="space-y-6">
                        <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                            Generate. Learn. Repeat.
                        </h1>
                        <p className="text-4xl font-medium text-primary">
                            The AI way
                        </p>
                        <p className="text-lg text-muted-foreground max-w-lg">
                            Revolutionize your learning experience with AI-powered study tools that adapt to your pace and style. Master any subject faster than ever before.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <button className="px-8 py-3 bg-destructive text-destructive-foreground border-2 border-foreground font-semibold shadow-sm hover:opacity-80 transition-opacity">
                                Get Started Free
                            </button>
                            <button className="px-8 py-3 bg-secondary text-secondary-foreground border-2 border-foreground font-semibold shadow-sm hover:opacity-80 transition-opacity">
                                Learn More
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-md bg-card border-2 border-foreground shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                                alt="Students learning with AI technology"
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection