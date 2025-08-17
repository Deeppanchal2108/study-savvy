import { useState, useEffect } from 'react'

export default function TypingSection() {
    const lines = [
        "Transform any content into",
        "personalized learning materials",
        "with AI-powered precision"
    ]

    const [displayedLines, setDisplayedLines] = useState(['', '', ''])
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        if (currentLineIndex < lines.length) {
            const currentLine = lines[currentLineIndex]

            if (currentCharIndex < currentLine.length) {
                const timeout = setTimeout(() => {
                    setDisplayedLines(prev => {
                        const newLines = [...prev]
                        newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
                        return newLines
                    })
                    setCurrentCharIndex(prev => prev + 1)
                }, 80)
                return () => clearTimeout(timeout)
            } else {
                const timeout = setTimeout(() => {
                    setCurrentLineIndex(prev => prev + 1)
                    setCurrentCharIndex(0)
                }, 500)
                return () => clearTimeout(timeout)
            }
        }
    }, [currentLineIndex, currentCharIndex, lines])

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-chart-3 border-t-8 border-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
             
                    <div className="space-y-2">
                        {lines.map((line, index) => (
                            <div key={index} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-mono leading-tight">
                                <span>{displayedLines[index]}</span>
                                {index === currentLineIndex && currentLineIndex < lines.length && showCursor && (
                                    <span className="animate-pulse">|</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col space-y-8">
                        <div className="bg-foreground text-background p-8 border-4 border-foreground shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold mb-4">Smart Learning</h3>
                            <p className="text-lg">AI that adapts to your learning style and pace</p>
                        </div>
                        <div className="bg-chart-1 text-foreground p-8 border-4 border-foreground shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold mb-4">Instant Generation</h3>
                            <p className="text-lg">From any content to study materials in seconds</p>
                        </div>
                        <div className="bg-destructive text-destructive-foreground p-8 border-4 border-foreground shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                            <h3 className="text-2xl font-bold mb-4">Proven Results</h3>
                            <p className="text-lg">Students improve retention by up to 80%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}