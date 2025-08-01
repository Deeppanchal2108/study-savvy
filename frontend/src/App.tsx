
import  { useState } from 'react'

function App() {
  const [name , setName]=useState("DEEP")
  return (
    <div>
      <h1 className="text-3xl font-bold underline bg-amber-50 ">
        Hello, Vite with React and Tailwind CSS!
      </h1>
      
    </div>
  )
}

export default App
