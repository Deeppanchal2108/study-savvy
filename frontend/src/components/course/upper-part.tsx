import { PopUp } from "./pop-up"

function UpperPart() {
  return (
    <div className="bg-card border-b-2 border-foreground shadow-[0_4px_0px_0px_rgba(0,0,0,1)] px-12 py-10 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        
        <div className="flex-1">
          <h1 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            My Courses
          </h1>

          <p className="text-muted-foreground font-mono text-sm md:text-base mb-5 max-w-xl leading-snug">
            Manage and view all the courses you’ve created. Track your students,
            update content, and build your teaching empire.
          </p>
        </div>
        
        <div className="flex-shrink-0 md:self-start md:mt-1 md:ml-8">
          <div className="h-10 flex items-center">
            <PopUp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpperPart
