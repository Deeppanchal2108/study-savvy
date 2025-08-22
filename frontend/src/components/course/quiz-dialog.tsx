
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
export interface Quiz {
    id: string;
    question: string;
    answer: string;
    options: string[];
    createdAt: string;
    topicId: string;
}

export default function QuizDialog({ quizzes }: { quizzes: Quiz[] }) {
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
