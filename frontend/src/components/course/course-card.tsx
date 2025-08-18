import { Link } from "react-router-dom"
interface CourseCardProps {
    id: string
    title: string
    duration: number
    completed: boolean
    imageUrl?: string
}

function CourseCard({ id, title, duration, completed, imageUrl }: CourseCardProps) {
    return (
        <Link to={`/course/${id}`}>
        
        <div
            className="bg-card border-2 border-foreground shadow-lg  p-4 w-72 hover:translate-x-1 hover:translate-y-1 transition-transform duration-150"
        >
            <div className="w-full h-40 bg-muted flex items-center justify-center overflow-hidden border-b-2 border-foreground mb-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-sm text-muted-foreground font-mono">No Image</span>
                )}
            </div>

            <h2 className="text-lg font-bold font-sans tracking-tight mb-2 text-foreground">
                {title}
            </h2>

            <div className="flex justify-between items-center font-mono text-sm">
                <span className="text-muted-foreground">{duration} hrs</span>

                <span
                    className={`px-3 py-1 rounded-sm border-2 shadow-xs font-bold tracking-tight 
      ${completed
                            ? "bg-green-400 text-black border-black"
                            : "bg-yellow-300 text-black border-black"
                        }`}
                >
                    {completed ? "✓ Completed" : "… In Progress"}
                </span>
            </div>

            </div>
        </Link>
    )
}

export default CourseCard
