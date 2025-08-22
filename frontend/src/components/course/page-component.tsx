import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export interface Page {
    id: string;
    title: string;
    content: string;
    pageNumber: number;
    createdAt: string;
    topicId: string;
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
export default function PagesComponent({ pages }: { pages: Page[] }) {
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
