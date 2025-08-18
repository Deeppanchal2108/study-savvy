import UpperPart from '@/components/course/upper-part'
import CourseCard from '@/components/course/course-card'

function CoursesPage() {
  // Dummy course data
  const courses = [
    {
      id: "1",
      title: "Intro to Web Development",
      duration: 12,
      completed: false,
      imageUrl: "https://source.unsplash.com/random/400x300?code",
    },
    {
      id: "2",
      title: "Advanced React",
      duration: 20,
      completed: true,
      imageUrl: "https://source.unsplash.com/random/400x300?react",
    },
    {
      id: "3",
      title: "Database Design",
      duration: 15,
      completed: false,
      imageUrl: "https://source.unsplash.com/random/400x300?database",
    },
  ]

  return (
    <div className="">
      {/* Top Section */}
      <UpperPart />

      {/* Courses Grid */}
      <div className="flex flex-wrap gap-8 mt-8 px-10">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

    </div>
  )
}

export default CoursesPage
