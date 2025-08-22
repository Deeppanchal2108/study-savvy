

import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
 export interface Flashcard {
    id: string;
    front: string;
    back: string;
    createdAt: string;
    topicId: string;
}
export default function FlashcardsDialog({ flashcards }: { flashcards: Flashcard[] }) {
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