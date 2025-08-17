import { useEffect, useState } from "react";
import TopicContent from "@/components/course/topic-content";
import axios from "axios";

interface Topic {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    courseId: string;
}

interface Course {
    id: string;
    title: string;
    duration: number;
    completed: boolean;
    createdAt: string;
    userId: string;
    topics: Topic[];
}

function CoursePage() {
    const id = "cmee3prkd0001bq78lmrmmwpf"; // You can replace this with useParams if needed
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    useEffect(() => {
   

        const fetchCourse = async () => {
            try {
                const response = await axios.post("http://localhost:3000/course/getCourse", {
                    id: "cmee3prkd0001bq78lmrmmwpf",
                    userId: "cmed9n2vy0000bqd4g0t5ea2t",
                });

                const data = response.data;
                setCourse(data);

                if (data.topics && data.topics.length > 0) {
                    setSelectedTopic(data.topics[0].id);
                }
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Failed to fetch course data");
            } finally {
                setLoading(false);
            }
        };


        fetchCourse();
    }, [id]);

    const handleTopicClick = (topicId: string) => {
        setSelectedTopic(topicId);
        setSidebarOpen(false); // Close mobile sidebar when topic is selected
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-lg text-muted-foreground">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-lg text-destructive">Error: {error}</div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-lg text-muted-foreground">No course found.</div>
            </div>
        );
    }

    // Get the selected topic object
    const currentTopic = course.topics.find(topic => topic.id === selectedTopic);

    return (
        <div className="flex h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-80 bg-sidebar border-r border-sidebar-border flex-col">
                <div className="p-6 border-b border-sidebar-border">
                    <h2 className="text-xl font-bold text-sidebar-foreground mb-2">{course.title}</h2>
                    <div className="text-sm text-muted-foreground">
                        {course.topics.filter(t => t.completed).length} / {course.topics.length} topics completed
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <nav className="p-4 space-y-2">
                        {course.topics.map((topic, index) => (
                            <button
                                key={topic.id}
                                onClick={() => handleTopicClick(topic.id)}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${selectedTopic === topic.id
                                        ? 'bg-sidebar-accent border-sidebar-primary text-sidebar-accent-foreground'
                                        : 'bg-card border-border hover:bg-sidebar-accent hover:border-sidebar-border text-card-foreground hover:text-sidebar-accent-foreground'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${topic.completed
                                                ? 'bg-green-500 text-white'
                                                : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {topic.completed ? '✓' : index + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{topic.title}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {topic.completed ? 'Completed' : 'Not started'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="relative w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col shadow-xl">
                        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-sidebar-foreground mb-2">{course.title}</h2>
                                <div className="text-sm text-muted-foreground">
                                    {course.topics.filter(t => t.completed).length} / {course.topics.length} topics completed
                                </div>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <nav className="p-4 space-y-2">
                                {course.topics.map((topic, index) => (
                                    <button
                                        key={topic.id}
                                        onClick={() => handleTopicClick(topic.id)}
                                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${selectedTopic === topic.id
                                                ? 'bg-sidebar-accent border-sidebar-primary text-sidebar-accent-foreground'
                                                : 'bg-card border-border hover:bg-sidebar-accent hover:border-sidebar-border text-card-foreground hover:text-sidebar-accent-foreground'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${topic.completed
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-muted text-muted-foreground'
                                                    }`}>
                                                    {topic.completed ? '✓' : index + 1}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">{topic.title}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {topic.completed ? 'Completed' : 'Not started'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col bg-background">
                {/* Mobile Header */}
                <div className="md:hidden p-4 border-b border-border bg-card">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="font-medium">Course Menu</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6">
                    <TopicContent
                        topicId={selectedTopic || ''}
                        topic={currentTopic}
                    />
                </div>
            </main>
        </div>
    );
}

export default CoursePage;