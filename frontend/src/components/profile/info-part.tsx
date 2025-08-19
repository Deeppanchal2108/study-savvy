import { useState, useEffect } from "react";
import { Mail, User, Calendar, XCircle, BookOpen, Clock, CheckCircle, Target } from "lucide-react";
import axios from "axios";
import PopUpEdit from "./pop-up-edit";

interface Course {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  createdAt: string;
  userId: string;
  topics?: any[];
}


interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string | null;
  createdAt: string;
  about?: string;
  skills?: string[];
  courses?: Course[];
}

interface InfoPartProps {
  userId: string;
}

function InfoPart({ userId }: InfoPartProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("http://localhost:3000/user/get", {
          userId
        });

        setUser(response.data);
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || "Unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);


  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-8 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-32 h-32 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_black]"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_black] w-1/2"></div>
              <div className="h-4 bg-gray-200 border-4 border-black shadow-[4px_4px_0px_0px_black] w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-100 border-4 border-black shadow-[8px_8px_0px_0px_black] p-8 text-center">
          <XCircle size={48} className="mx-auto mb-4 text-red-600" />
          <h2 className="text-lg font-bold mb-2">Error loading user</h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-8 text-center">
          <User size={48} className="mx-auto mb-4" />
          <h2 className="text-lg font-bold">No user found</h2>
        </div>
      </div>
    );
  }

  const completedCourses = user.courses?.filter(course => course.completed) || [];
  const totalCourses = user.courses?.length || 0;
  const totalDuration = user.courses?.reduce((sum, course) => sum + course.duration, 0) || 0;

  

  return (
    <div className="w-full max-w-5xl mx-auto p-6  min-h-screen space-y-6">
      <PopUpEdit
        user={user}
        onSave={(updatedData) => {    
          console.log('User updated:', updatedData);
        }}
        triggerText="Edit My Profile"
      />

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">

          <div className="flex-shrink-0">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-32 h-32 border-4 border-black shadow-[4px_4px_0px_0px_black] object-cover"
              />
            ) : (
              <div className="w-32 h-32 bg-purple-200 border-4 border-black shadow-[4px_4px_0px_0px_black] flex items-center justify-center">
                <User size={48} className="text-black" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-6 text-black">
              {user.firstName} {user.lastName}
            </h1>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-400 border-2 border-black p-2">
                  <Mail size={18} className="text-black" />
                </div>
                <span className="font-medium text-black">{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-green-400 border-2 border-black p-2">
                  <Calendar size={18} className="text-black" />
                </div>
                <span className="font-medium text-black">
                  Joined {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-6">
          <div className="bg-orange-400 border-2 border-black p-3 w-fit mx-auto mb-4">
            <BookOpen size={24} className="text-black" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{totalCourses}</div>
            <div className="text-sm font-bold uppercase tracking-wider text-black mt-1">Total Courses</div>
          </div>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-6">
          <div className="bg-green-400 border-2 border-black p-3 w-fit mx-auto mb-4">
            <CheckCircle size={24} className="text-black" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{completedCourses.length}</div>
            <div className="text-sm font-bold uppercase tracking-wider text-black mt-1">Completed</div>
          </div>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-6">
          <div className="bg-blue-400 border-2 border-black p-3 w-fit mx-auto mb-4">
            <Clock size={24} className="text-black" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{totalDuration}h</div>
            <div className="text-sm font-bold uppercase tracking-wider text-black mt-1">Duration</div>
          </div>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] p-6">
          <div className="bg-purple-400 border-2 border-black p-3 w-fit mx-auto mb-4">
            <Target size={24} className="text-black" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{user.skills?.length || 0}</div>
            <div className="text-sm font-bold uppercase tracking-wider text-black mt-1">Skills</div>
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black]">
        <div className="bg-yellow-400 border-b-4 border-black p-4">
          <h2 className="text-xl font-bold uppercase tracking-wider text-black">About Me</h2>
        </div>
        <div className="p-8">
          <p className="text-black leading-relaxed text-lg">
            {user.about || "No description added yet."}
          </p>
        </div>
      </div>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black]">
        <div className="bg-pink-400 border-b-4 border-black p-4">
          <h2 className="text-xl font-bold uppercase tracking-wider text-black">Skills</h2>
        </div>
        <div className="p-8">
          {user.skills && user.skills.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {user.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-cyan-400 border-4 border-black shadow-[4px_4px_0px_0px_black] p-4 text-center font-bold text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_black] transition-all duration-200"
                >
                  {skill}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No skills added yet.</p>
          )}
        </div>
      </div>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black]">
        <div className="bg-red-400 border-b-4 border-black p-4">
          <h2 className="text-xl font-bold uppercase tracking-wider text-black">My Courses</h2>
        </div>
        <div className="p-8">
          {user.courses && user.courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.courses.map((course) => (
                <div
                  key={course.id}
                  className={`border-4 border-black shadow-[6px_6px_0px_0px_black] p-6 ${course.completed ? 'bg-green-200' : 'bg-yellow-200'
                    }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg text-black leading-tight pr-2">{course.title}</h3>
                    {course.completed && (
                      <div className="bg-green-400 border-2 border-black p-1">
                        <CheckCircle className="text-black" size={16} />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-white border-2 border-black p-1">
                        <Clock size={14} className="text-black" />
                      </div>
                      <span className="text-sm font-bold text-black">{course.duration} hours</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-white border-2 border-black p-1">
                        <Calendar size={14} className="text-black" />
                      </div>
                      <span className="text-sm font-bold text-black">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className={`inline-block px-4 py-2 border-3 border-black font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_black] ${course.completed
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                    }`}>
                    {course.completed ? 'Completed' : 'In Progress'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 border-4 border-black shadow-[6px_6px_0px_0px_black] p-6 text-center">
              <p className="text-black font-bold">No courses enrolled yet.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default InfoPart;