import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuizDialog from "./quiz-dialog";
import type { Quiz } from "./quiz-dialog";
import type { Flashcard } from "./flashcard-dialog";
import FlashcardsDialog from "./flashcard-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getCurrentUserId } from "@/lib/userId";
import SummaryDialog from "./summary-dialog";
import type { Summary } from "./summary-dialog";
import PagesComponent from "./page-component";
import type { Page } from "./page-component";



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
                                        {/* <span>🧠</span> */}
                                        <span>Quiz</span>
                                        {/* <div className="px-1.5 py-0.5 bg-muted text-muted-foreground border-2 border-black shadow-[1px_1px_0_0_black] font-medium text-xs rounded-none">
                                            {topicDetails.quizzes?.length || 0}
                                        </div> */}
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
                                        {/* <span>🔄</span> */}
                                        <span>Flashcards</span>
                                        {/* <div className="px-1.5 py-0.5 bg-muted text-muted-foreground border-2 border-black shadow-[1px_1px_0_0_black] font-medium text-xs rounded-none">
                                            {topicDetails.flashcards?.length || 0}
                                        </div> */}
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
                                        {/* <span>📝</span> */}
                                        <span>Summary</span>
                                        {/* {topicDetails.summary && (
                                            <div className="px-1.5 py-0.5 bg-muted text-muted-foreground border-2 border-black shadow-[1px_1px_0_0_black] font-medium text-xs rounded-none">
                                                Available
                                            </div>
                                        )} */}
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