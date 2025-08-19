import { useEffect, useState } from "react";

import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getCurrentUserId } from "@/lib/userId";

interface Page {
    id: string;
    title: string;
    content: string;
    pageNumber: number;
    createdAt: string;
    topicId: string;
}

interface Quiz {
    id: string;
    question: string;
    answer: string;
    options: string[];
    createdAt: string;
    topicId: string;
}

interface Flashcard {
    id: string;
    front: string;
    back: string;
    createdAt: string;
    topicId: string;
}

interface Summary {
    id: string;
    content: string;
    keyPoints: string[];
    createdAt: string;
    topicId: string;
}

interface TopicDetails {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    courseId: string;
    course: {
        id: string;
        title: string;
    };
    pages: Page[];
    quizzes: Quiz[];
    flashcards: Flashcard[];
    summary: Summary | null;
}

// Quiz Dialog Component
function QuizDialog({ quizzes }: { quizzes: Quiz[] }) {
    if (!quizzes || quizzes.length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-muted-foreground">No quizzes available for this topic</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {quizzes.map((quiz, index) => (
                <Card key={quiz.id}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Quiz Question {index + 1}</CardTitle>
                            <Badge variant="secondary">
                                {quiz.options?.length || 0} Options
                            </Badge>
                        </div>
                        <CardDescription>
                            {quiz.question}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {quiz.options && quiz.options.map((option, optionIndex) => (
                                <Button
                                    key={optionIndex}
                                    variant="outline"
                                    className="w-full text-left justify-start"
                                >
                                    {String.fromCharCode(65 + optionIndex)}. {option}
                                </Button>
                            ))}
                            <div className="pt-3 border-t">
                                <p className="text-sm text-muted-foreground">
                                    <strong>Answer:</strong> {quiz.answer}
                                </p>
                                <div className="text-xs text-muted-foreground mt-1">
                                    Created: {new Date(quiz.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// Flashcards Dialog Component
function FlashcardsDialog({ flashcards }: { flashcards: Flashcard[] }) {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!flashcards || flashcards.length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-muted-foreground">No flashcards available for this topic</p>
            </div>
        );
    }

    const nextCard = () => {
        setIsFlipped(false);
        setCurrentCard((prev) => (prev + 1) % flashcards.length);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Flashcards</h3>
                <Badge variant="outline">
                    {currentCard + 1} / {flashcards.length}
                </Badge>
            </div>

            <Progress value={((currentCard + 1) / flashcards.length) * 100} className="w-full" />

            <Card className="min-h-[250px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                <CardContent className="flex items-center justify-center h-full p-8">
                    <div className="text-center space-y-4">
                        <Badge variant={isFlipped ? "secondary" : "default"}>
                            {isFlipped ? "Back" : "Front"}
                        </Badge>
                        <p className="text-lg leading-relaxed">
                            {isFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Click to {isFlipped ? "see front" : "reveal back"}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" onClick={prevCard} disabled={flashcards.length <= 1}>
                    Previous
                </Button>
                <Button onClick={() => setIsFlipped(!isFlipped)}>
                    {isFlipped ? "Show Front" : "Show Back"}
                </Button>
                <Button variant="outline" onClick={nextCard} disabled={flashcards.length <= 1}>
                    Next
                </Button>
            </div>
        </div>
    );
}
// Summary Dialog Component
function SummaryDialog({ summary }: { summary: Summary | null }) {
    if (!summary) {
        return (
            <div className="p-6 text-center">
                <p className="text-muted-foreground">No summary available for this topic</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-h-[500px] overflow-y-auto">
            <div>
                <h4 className="font-semibold mb-3">Overview</h4>
                <p className="text-muted-foreground leading-relaxed">{summary.content}</p>
            </div>

            {summary.keyPoints && summary.keyPoints.length > 0 && (
                <>
                    <Separator />
                    <div>
                        <h4 className="font-semibold mb-3">Key Points</h4>
                        <ul className="space-y-2">
                            {summary.keyPoints.map((point, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                    <Badge variant="outline" className="mt-0.5 text-xs">
                                        {index + 1}
                                    </Badge>
                                    <span className="text-muted-foreground">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            <Separator />
            <div className="text-sm text-muted-foreground">
                Last updated: {new Date(summary.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
}
function formatContent(content: string): string {
    return content
        // Convert **text** to <strong>text</strong> with better styling
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
        // Convert *text* to <em>text</em>
        .replace(/\*([^*]+)\*/g, '<em class="italic text-muted-foreground">$1</em>')
        // Convert `code` to <code>code</code> with styling
        .replace(/`([^`]+)`/g, '<code class="bg-muted text-foreground px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
        // Convert bullet points • to proper list items
        .replace(/^• (.+)$/gm, '<div class="flex items-start gap-2 my-2"><span class="text-primary mt-1">•</span><span>$1</span></div>')
        // Convert paragraphs (double line breaks)
        .replace(/\n\n/g, '</p><p class="mb-4">')
        // Convert single line breaks to <br>
        .replace(/\n/g, '<br>')
        // Wrap everything in a paragraph if it doesn't start with a tag
        .replace(/^(?!<)/, '<p class="mb-4">')
        // Close the last paragraph
        .replace(/$/, '</p>');
}

function PagesComponent({ pages }: { pages: Page[] }) {
    if (!pages || pages.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Content</CardTitle>
                    <CardDescription>No content pages available for this topic</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    // Sort pages by page number
    const sortedPages = [...pages].sort((a, b) => a.pageNumber - b.pageNumber);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Learning Content</h3>
                <Badge variant="outline">
                    {sortedPages.length} {sortedPages.length === 1 ? 'Section' : 'Sections'}
                </Badge>
            </div>

            <Card>
                <CardContent className="p-0">
                    <ScrollArea className="h-[600px] w-full">
                        <div className="space-y-8 p-6">
                            {sortedPages.map((page, index) => (
                                <div key={page.id} className="space-y-4">
                            
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="text-xs">
                                                Section {page.pageNumber}
                                            </Badge>
                                            <h4 className="text-xl font-semibold">{page.title}</h4>
                                        </div>
                                    </div>

                                    <div className="text-muted-foreground leading-7 space-y-4">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: formatContent(page.content)
                                            }}
                                        />
                                    </div>

                                    {index < sortedPages.length - 1 && (
                                        <Separator className="my-8" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}


interface TopicContentProps {
    topicId: string;
    topic?: Topic;
}

interface Topic {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    courseId: string;
}

export default function TopicContent({ topicId }: TopicContentProps) {

    const userId=getCurrentUserId()
    const [topicDetails, setTopicDetails] = useState<TopicDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!topicId) return;

        const fetchTopicDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post<TopicDetails>(
                    "http://localhost:3000/course/getTopic",
                    {
                        topicId: topicId,
                        userId 
                    }
                );
                setTopicDetails(response.data);
                console.log("Here is the response : ", response)
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to fetch topic details");
            } finally {
                setLoading(false);
            }
        };

        fetchTopicDetails();
    }, [topicId]);
    if (loading) {
        return (
            <div className="flex h-full items-center justify-center min-h-[200px]">
                <div className="w-6 h-6 bg-primary animate-spin"></div>
            </div>
        );
    }
    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-destructive">Error</CardTitle>
                    <CardDescription>{error}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!topicDetails) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Topic Not Found</CardTitle>
                    <CardDescription>The selected topic could not be loaded</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="space-y-8">
            {/* Topic Header with Action Buttons */}
            <Card className="border-4 border-black shadow-[6px_6px_0_0_black] bg-card rounded-none">
                <CardHeader className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        <div className="space-y-2 flex-1">
                            <CardTitle className="text-xl lg:text-2xl font-semibold text-card-foreground">{topicDetails.title}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                {topicDetails.course.title} • Created {new Date(topicDetails.createdAt).toLocaleDateString()}
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge
                                className={`font-medium px-3 py-1 border-3 border-black shadow-[3px_3px_0_0_black] rounded-none text-xs ${topicDetails.completed
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground'
                                    }`}
                            >
                                {topicDetails.completed ? "Completed" : "In Progress"}
                            </Badge>
                        </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-4 border-t-3 border-black">
                        <div className="grid grid-cols-3 gap-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="flex items-center gap-2 p-3 h-auto border-3 border-black shadow-[4px_4px_0_0_black] hover:shadow-[6px_6px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-chart-1 text-black hover:bg-chart-2 font-medium rounded-none text-sm"
                                    >
                                        <span>🧠</span>
                                        <span>Quiz</span>
                                        <div className="px-1.5 py-0.5 bg-muted text-muted-foreground border-2 border-black shadow-[1px_1px_0_0_black] font-medium text-xs rounded-none">
                                            {topicDetails.quizzes?.length || 0}
                                        </div>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl border-4 border-black shadow-[12px_12px_0_0_black] bg-card rounded-none">
                                    <DialogHeader>
                                        <DialogTitle className="font-bold text-xl text-card-foreground">Quiz</DialogTitle>
                                        <DialogDescription className="font-medium text-muted-foreground">
                                            Test your knowledge on this topic
                                        </DialogDescription>
                                    </DialogHeader>
                                    <QuizDialog quizzes={topicDetails.quizzes} />
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="flex items-center gap-2 p-3 h-auto border-3 border-black shadow-[4px_4px_0_0_black] hover:shadow-[6px_6px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-chart-2 text-black hover:bg-chart-3 font-medium rounded-none text-sm"
                                    >
                                        <span>🔄</span>
                                        <span>Flashcards</span>
                                        <div className="px-1.5 py-0.5 bg-muted text-muted-foreground border-2 border-black shadow-[1px_1px_0_0_black] font-medium text-xs rounded-none">
                                            {topicDetails.flashcards?.length || 0}
                                        </div>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl border-4 border-black shadow-[12px_12px_0_0_black] bg-card rounded-none">
                                    <DialogHeader>
                                        <DialogTitle className="font-bold text-xl text-card-foreground">Flashcards</DialogTitle>
                                        <DialogDescription className="font-medium text-muted-foreground">
                                            Review key concepts with interactive flashcards
                                        </DialogDescription>
                                    </DialogHeader>
                                    <FlashcardsDialog flashcards={topicDetails.flashcards} />
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="flex items-center gap-2 p-3 h-auto border-3 border-black shadow-[4px_4px_0_0_black] hover:shadow-[6px_6px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-chart-4 text-black hover:bg-chart-5 font-medium rounded-none text-sm"
                                    >
                                        <span>📝</span>
                                        <span>Summary</span>
                                        {topicDetails.summary && (
                                            <div className="px-1.5 py-0.5 bg-muted text-muted-foreground border-2 border-black shadow-[1px_1px_0_0_black] font-medium text-xs rounded-none">
                                                Available
                                            </div>
                                        )}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl border-4 border-black shadow-[12px_12px_0_0_black] bg-card rounded-none">
                                    <DialogHeader>
                                        <DialogTitle className="font-bold text-xl text-card-foreground">Topic Summary</DialogTitle>
                                        <DialogDescription className="font-medium text-muted-foreground">
                                            Key points and overview of this topic
                                        </DialogDescription>
                                    </DialogHeader>
                                    <SummaryDialog summary={topicDetails.summary} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="border-4 border-black shadow-[8px_8px_0_0_black] bg-card rounded-none">
                <PagesComponent pages={topicDetails.pages} />
            </div>
        </div>
    );
}