import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface Quiz {
    id: string;
    question: string;
    answer: string;
    options: string[];
    createdAt: string;
    topicId: string;
}

export default function QuizDialog({ quizzes }: { quizzes: Quiz[] }) {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
    const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>({});

    if (!quizzes || quizzes.length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-muted-foreground">No quizzes available for this topic</p>
            </div>
        );
    }

    const handleOptionClick = (quizId: string, optionIndex: number) => {
        setSelectedAnswers(prev => ({ ...prev, [quizId]: optionIndex }));
        setShowAnswers(prev => ({ ...prev, [quizId]: true }));
    };

    const getCorrectAnswerIndex = (quiz: Quiz) => {
        return quiz.options.findIndex(option => option === quiz.answer);
    };

    const getButtonVariant = (quizId: string, optionIndex: number, quiz: Quiz) => {
        if (!showAnswers[quizId]) return "outline";

        const correctIndex = getCorrectAnswerIndex(quiz);
        const selectedIndex = selectedAnswers[quizId];

        if (optionIndex === correctIndex) {
            return "default";
        } else if (optionIndex === selectedIndex && selectedIndex !== correctIndex) {
            return "destructive";
        }

        return "outline";
    };

    const getButtonClassName = (quizId: string, optionIndex: number, quiz: Quiz) => {
        let className = "w-full text-left justify-start h-auto min-h-[2.5rem] py-3 px-4 whitespace-normal break-words";

        if (showAnswers[quizId]) {
            const correctIndex = getCorrectAnswerIndex(quiz);
            const selectedIndex = selectedAnswers[quizId];

            if (optionIndex === correctIndex) {
                className += " bg-green-100 border-green-500 text-green-800 hover:bg-green-200";
            } else if (optionIndex === selectedIndex && selectedIndex !== correctIndex) {
                className += " bg-red-100 border-red-500 text-red-800 hover:bg-red-200";
            }
        }

        return className;
    };

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
                                    variant={getButtonVariant(quiz.id, optionIndex, quiz)}
                                    className={getButtonClassName(quiz.id, optionIndex, quiz)}
                                    onClick={() => handleOptionClick(quiz.id, optionIndex)}
                                    disabled={showAnswers[quiz.id]}
                                >
                                    <span className="inline-block">
                                        <span className="font-semibold">{String.fromCharCode(65 + optionIndex)}.</span>{" "}
                                        <span>{option}</span>
                                    </span>
                                </Button>
                            ))}
                            {showAnswers[quiz.id] && (
                                <div className="pt-3 border-t">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Correct Answer:</strong> {quiz.answer}
                                    </p>
                                    {selectedAnswers[quiz.id] === getCorrectAnswerIndex(quiz) ? (
                                        <p className="text-sm text-green-600 font-medium mt-1">
                                            ✓ Correct! Well done.
                                        </p>
                                    ) : (
                                        <p className="text-sm text-red-600 font-medium mt-1">
                                            ✗ Incorrect. The correct answer is highlighted in green.
                                        </p>
                                    )}
                                    <div className="text-xs text-muted-foreground mt-2">
                                        Created: {new Date(quiz.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}