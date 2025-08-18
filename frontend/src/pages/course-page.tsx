import { useEffect, useState } from "react";
import TopicContent from "@/components/course/topic-content";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getCurrentUserId } from "@/lib/userId";
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
    const { id } = useParams<{ id: string }>();
    const userId = getCurrentUserId();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [updatingTopics, setUpdatingTopics] = useState<Set<string>>(new Set());

    useEffect(() => {
     
        const fetchCourse = async () => {
            
            try {
                const response = await axios.post("http://localhost:3000/course/getCourse", {
                    id,
                    userId,
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
        setSidebarOpen(false);
    };

    const toggleTopicCompletion = async (topicId: string, currentStatus: boolean) => {
        // Add to updating set to show loading state
        setUpdatingTopics(prev => new Set(prev).add(topicId));

        try {
         
            const response = await axios.post("http://localhost:3000/course/updateTopicCompletion", {
                topicId: topicId,
                completed: !currentStatus,
                userId
            });

            setCourse(prevCourse => {
                if (!prevCourse) return prevCourse;

                return {
                    ...prevCourse,
                    topics: prevCourse.topics.map(topic =>
                        topic.id === topicId
                            ? { ...topic, completed: !currentStatus }
                            : topic
                    )
                };
            });

            // ✅ Show success toast
            toast.success(
                `Topic marked as ${!currentStatus ? "completed ✅" : "in progress ⏳"}`
            );

        } catch (err: any) {
            console.error("Failed to update topic completion:", err);

            toast.error("Failed to update topic completion. Please try again.");
        } finally {
           
            setUpdatingTopics(prev => {
                const newSet = new Set(prev);
                newSet.delete(topicId);
                return newSet;
            });
        }
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

    const currentTopic = course.topics.find(topic => topic.id === selectedTopic);

    const TopicButton = ({ topic, index }: { topic: Topic; index: number }) => {
        const isUpdating = updatingTopics.has(topic.id);

        return (
            <button
                onClick={() => handleTopicClick(topic.id)}
                className={`w-full text-left p-4 transition-all duration-200 border-4 border-black shadow-[4px_4px_0_0_black] hover:shadow-[6px_6px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] ${selectedTopic === topic.id
                    ? 'bg-primary text-primary-foreground transform translate-x-[-2px] translate-y-[-2px] shadow-[6px_6px_0_0_black]'
                    : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center text-xs font-black ${topic.completed
                            ? 'bg-green-400 text-black shadow-[2px_2px_0_0_black]'
                            : 'bg-muted text-black shadow-[2px_2px_0_0_black]'
                            }`}>
                            {topic.completed ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                            <div className="font-black text-sm uppercase">{topic.title}</div>
                            <div className="text-xs font-bold opacity-80">
                                {topic.completed ? 'COMPLETED' : 'NOT STARTED'}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleTopicCompletion(topic.id, topic.completed);
                        }}
                        disabled={isUpdating}
                        className={`p-2 font-black text-xs uppercase transition-all duration-200 border-2 border-black shadow-[2px_2px_0_0_black] hover:shadow-[3px_3px_0_0_black] hover:translate-x-[-1px] hover:translate-y-[-1px] ${isUpdating
                                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                : topic.completed
                                    ? 'bg-orange-400 text-black hover:bg-orange-500'
                                    : 'bg-green-400 text-black hover:bg-green-500'
                            }`}
                    >
                        {isUpdating
                            ? '...'
                            : topic.completed
                                ? 'UNDO'
                                : 'DONE'
                        }
                    </button>
                </div>
            </button>
        );
    };

    return (
        <div className="flex h-screen bg-background">
          
            <aside className="hidden md:flex w-80 bg-sidebar border-r-4 border-black flex-col shadow-[8px_0_0_0_black] h-screen">
          
                <div className="p-6 border-b-4 border-black bg-sidebar flex-shrink-0">
                    <h2 className="text-xl font-black text-sidebar-foreground mb-2 uppercase tracking-tight">{course.title}</h2>
                    <div className="text-sm text-muted-foreground font-bold">
                        {course.topics.filter(t => t.completed).length} / {course.topics.length} topics completed
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0">
                    <nav className="p-4 space-y-3">
                        {course.topics.map((topic, index) => (
                            <TopicButton key={topic.id} topic={topic} index={index} />
                        ))}
                    </nav>
                </div>
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative w-80 h-full bg-sidebar border-r-4 border-black flex flex-col shadow-[8px_0_0_0_black]">
                        <div className="p-6 border-b-4 border-black flex items-center justify-between bg-sidebar flex-shrink-0">
                            <div>
                                <h2 className="text-xl font-black text-sidebar-foreground mb-2 uppercase tracking-tight">{course.title}</h2>
                                <div className="text-sm text-muted-foreground font-bold">
                                    {course.topics.filter(t => t.completed).length} / {course.topics.length} topics completed
                                </div>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="p-3 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors border-2 border-black shadow-[2px_2px_0_0_black] hover:shadow-[4px_4px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] font-black text-lg"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto min-h-0">
                            <nav className="p-4 space-y-3">
                                {course.topics.map((topic, index) => (
                                    <TopicButton key={topic.id} topic={topic} index={index} />
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}


            <main className="flex-1 flex flex-col bg-background min-h-0">
                <div className="md:hidden p-4 border-b-4 border-black bg-card shadow-[0_4px_0_0_black] flex-shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center space-x-3 p-4 bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 border-4 border-black shadow-[4px_4px_0_0_black] hover:shadow-[6px_6px_0_0_black] hover:translate-x-[-2px] hover:translate-y-[-2px] font-black uppercase"
                    >
                        <svg className="w-6 h-6 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="font-black">Course Menu</span>
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
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