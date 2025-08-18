import { useState, useEffect } from "react";
import { Mail, User, Calendar, XCircle, BookOpen } from "lucide-react";
import axios from "axios";

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string | null;
  createdAt: string;
  about?: string;
  courses?: any[];
}

function InfoPart() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("http://localhost:3000/user/get", {
          userId: "cmed9n2vy0000bqd4g0t5ea2t"
        });

        console.log("User data : ", response.data);
        setUser(response.data);
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || "Unknown error occurred";
        setError(message);
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-card border-4 border-black shadow-xl animate-pulse">
          <div className="p-8">
            <div className="flex gap-8">
              <div className="w-40 h-40 bg-chart-1 border-4 border-black rounded-full"></div>
              <div className="space-y-4 flex-1">
                <div className="h-12 bg-chart-2 border-2 border-black w-1/2"></div>
                <div className="h-6 bg-chart-3 border-2 border-black w-1/3"></div>
                <div className="h-20 bg-chart-4 border-2 border-black"></div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="h-16 bg-chart-1 border-2 border-black"></div>
                  <div className="h-16 bg-chart-2 border-2 border-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-destructive border-4 border-black shadow-xl">
          <div className="p-8 text-center">
            <XCircle size={64} className="mx-auto mb-4 text-destructive-foreground" />
            <h2 className="text-3xl font-bold text-destructive-foreground mb-4 uppercase tracking-wide">
              ERROR!
            </h2>
            <p className="text-destructive-foreground font-mono text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-muted border-4 border-black shadow-xl">
          <div className="p-8 text-center">
            <User size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-3xl font-bold text-muted-foreground uppercase tracking-wide">
              NO USER FOUND
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans">
      {/* Single Main Info Box */}
      <div className="bg-card border-4 border-black shadow-xl transform hover:translate-x-1 hover:translate-y-1 hover:shadow-2xl transition-all duration-300">
        <div className="p-8">

          <div className="flex items-start gap-8">
            {/* Profile Picture - Left Side */}
            <div className="relative flex-shrink-0">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-40 h-40 border-4 border-black shadow-lg object-cover rounded-full"
                />
              ) : (
                <div className="w-40 h-40 bg-chart-1 border-4 border-black shadow-lg flex items-center justify-center rounded-full">
                  <User size={64} className="text-white" />
                </div>
              )}
            </div>

            {/* Information Section - Right Side */}
            <div className="flex-1">

              {/* Name and Title */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight uppercase">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="bg-primary border-2 border-black px-4 py-2 inline-block">
                  <span className="text-primary-foreground font-bold uppercase tracking-wide">
                    FULL STACK DEVELOPER
                  </span>
                </div>
              </div>

              {/* About Description */}
              {user.about && (
                <div className="mb-6">
                  <p className="text-foreground text-lg leading-relaxed">
                    {user.about}
                  </p>
                </div>
              )}

              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="bg-chart-1 border-2 border-black p-2">
                    <Mail className="text-white" size={20} />
                  </div>
                  <span className="text-foreground font-mono">{user.email}</span>
                </div>

                {/* Courses Count */}
                {user.courses && (
                  <div className="flex items-center gap-3">
                    <div className="bg-chart-2 border-2 border-black p-2">
                      <BookOpen className="text-black" size={20} />
                    </div>
                    <span className="text-foreground font-mono">{user.courses.length} Courses</span>
                  </div>
                )}

                {/* Join Date */}
                <div className="flex items-center gap-3">
                  <div className="bg-chart-3 border-2 border-black p-2">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <span className="text-foreground font-mono">
                    Joined {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                </div>

                {/* User ID (if needed) */}
                <div className="flex items-center gap-3">
                  <div className="bg-chart-4 border-2 border-black p-2">
                    <User className="text-black" size={20} />
                  </div>
                  <span className="text-foreground font-mono text-sm">
                    ID: {user.id.substring(0, 8)}...
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default InfoPart;