

import { Separator } from "@radix-ui/react-separator";
import { Badge } from "../ui/badge";
export interface Summary {
    id: string;
    content: string;
    keyPoints: string[];
    createdAt: string;
    topicId: string;
}


 export default function SummaryDialog({ summary }: { summary: Summary | null }) {
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


