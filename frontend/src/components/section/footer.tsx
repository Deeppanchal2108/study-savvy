import React from 'react'

function Footer() {
    return (
        <footer className="bg-foreground text-background border-t-4 border-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


                <div className="text-center space-y-6">
                    <h3 className="text-4xl font-bold font-mono tracking-tighter">StudySavvy</h3>
                    <p className="text-xl text-background/90 max-w-2xl mx-auto">
                        Generate. Learn. Repeat. The AI way.
                    </p>
                    <p className="text-background/70 max-w-xl mx-auto">
                        Transform any content into personalized study materials with AI-powered precision
                    </p>
                </div>

                
                <div className="border-t border-background/20 mt-12 pt-8 text-center">
                    <p className="text-background/60">
                        © 2025 StudySavvy - Built for the future of learning
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer