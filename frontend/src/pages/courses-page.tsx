import { useEffect, useState } from "react"
import axios from "axios"
import UpperPart from "@/components/course/upper-part"
import CourseCard from "@/components/course/course-card"
import { getCurrentUserId } from "@/lib/userId"

function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const userId = getCurrentUserId()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.post("http://localhost:3000/course/getCourses", {
          userId,
        })
        setCourses(data)
      } catch (err: any) {
        if (err.response?.status === 404) {
       
          setCourses([])
        } else {
          console.error("Error fetching courses:", err)
          setError("Failed to load courses")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [userId])

  if (loading) {
    return <p className="px-10 mt-8">Loading courses...</p>
  }

  if (error) {
    return <p className="px-10 mt-8 text-red-500">{error}</p>
  }

  return (
    <div>
    
      <UpperPart />

      <div className="flex flex-wrap gap-8 mt-8 px-10">
        {courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course.id} {...course} />)
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  )
}

export default CoursesPage
