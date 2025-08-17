import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Enhanced interfaces based on your API response
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
    title: string;
    questions: any[]; // You can define a more specific Question interface if needed
    createdAt: string;
    topicId: string;
}

interface Flashcard {
    id: string;
    question: string;
    answer: string;
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

// Quiz Component
function QuizComponent({ quizzes }: { quizzes: Quiz[] }) {
    if (!quizzes || quizzes.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Quiz</CardTitle>
                    <CardDescription>No quizzes available for this topic</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {quizzes.map((quiz) => (
                <Card key={quiz.id}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{quiz.title}</CardTitle>
                            <Badge variant="secondary">
                                {quiz.questions?.length || 0} Questions
                            </Badge>
                        </div>
                        <CardDescription>
                            Test your knowledge on this topic
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Created: {new Date(quiz.createdAt).toLocaleDateString()}
                            </div>
                            <Button>Start Quiz</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

// Flashcards Component
function FlashcardsComponent({ flashcards }: { flashcards: Flashcard[] }) {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!flashcards || flashcards.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Flashcards</CardTitle>
                    <CardDescription>No flashcards available for this topic</CardDescription>
                </CardHeader>
            </Card>
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

            <Card className="min-h-[300px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                <CardContent className="flex items-center justify-center h-full p-8">
                    <div className="text-center space-y-4">
                        <Badge variant={isFlipped ? "secondary" : "default"}>
                            {isFlipped ? "Answer" : "Question"}
                        </Badge>
                        <p className="text-lg leading-relaxed">
                            {isFlipped ? flashcards[currentCard].answer : flashcards[currentCard].question}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Click to {isFlipped ? "see question" : "reveal answer"}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" onClick={prevCard} disabled={flashcards.length <= 1}>
                    Previous
                </Button>
                <Button onClick={() => setIsFlipped(!isFlipped)}>
                    {isFlipped ? "Show Question" : "Show Answer"}
                </Button>
                <Button variant="outline" onClick={nextCard} disabled={flashcards.length <= 1}>
                    Next
                </Button>
            </div>
        </div>
    );
}

// Summary Component
function SummaryComponent({ summary }: { summary: Summary | null }) {
    if (!summary) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>No summary available for this topic</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Topic Summary</CardTitle>
                <CardDescription>
                    Key points and overview of this topic
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
        </Card>
    );
}

// Pages Component
function PagesComponent({ pages }: { pages: Page[] }) {
    const [currentPage, setCurrentPage] = useState(0);

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
                    Page {currentPage + 1} of {sortedPages.length}
                </Badge>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{sortedPages[currentPage].title}</CardTitle>
                    <Progress value={((currentPage + 1) / sortedPages.length) * 100} className="w-full" />
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px] w-full">
                        <div className="prose prose-sm max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: sortedPages[currentPage].content }} />
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                >
                    Previous Page
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(sortedPages.length - 1, prev + 1))}
                    disabled={currentPage === sortedPages.length - 1}
                >
                    Next Page
                </Button>
            </div>
        </div>
    );
}

// Topic Content Component
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
                        userId: "cmed9n2vy0000bqd4g0t5ea2t", // You might want to get this from context/props
                    }
                );
                setTopicDetails(response.data);
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
            <div className="flex h-full items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary/30 rounded-full animate-spin animation-delay-150"></div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-medium text-foreground">Loading Topic Content</p>
                            <p className="text-sm text-muted-foreground">Please wait while we fetch your learning materials...</p>
                        </div>
                        <div className="w-full max-w-xs">
                            <Progress value={66} className="w-full" />
                        </div>
                    </CardContent>
                </Card>
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
        <div className="space-y-6">
            {/* Topic Header */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">{topicDetails.title}</CardTitle>
                            <CardDescription>
                                {topicDetails.course.title} • Created {new Date(topicDetails.createdAt).toLocaleDateString()}
                            </CardDescription>
                        </div>
                        <Badge variant={topicDetails.completed ? "default" : "secondary"}>
                            {topicDetails.completed ? "Completed" : "In Progress"}
                        </Badge>
                    </div>
                </CardHeader>
            </Card>

            {/* Content Tabs */}
            <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-12">
                    <TabsTrigger value="content" className="text-sm">
                        📚 Content ({topicDetails.pages?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="quiz" className="text-sm">
                        🧠 Quiz ({topicDetails.quizzes?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="flashcards" className="text-sm">
                        🔄 Flashcards ({topicDetails.flashcards?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="text-sm">
                        📝 Summary
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4 mt-6">
                    <PagesComponent pages={topicDetails.pages} />
                </TabsContent>

                <TabsContent value="quiz" className="space-y-4 mt-6">
                    <QuizComponent quizzes={topicDetails.quizzes} />
                </TabsContent>

                <TabsContent value="flashcards" className="space-y-4 mt-6">
                    <FlashcardsComponent flashcards={topicDetails.flashcards} />
                </TabsContent>

                <TabsContent value="summary" className="space-y-4 mt-6">
                    <SummaryComponent summary={topicDetails.summary} />
                </TabsContent>
            </Tabs>
        </div>
    );
}