import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function GetProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch profile
  const getUserProfile = async () => {
    try {
      const res = await fetch(`${backendUrl}getProfile`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    getUserProfile()
      .then((res) => res && setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    fetch(`${backendUrl}logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      window.location.href = "/";
    });
  };

  const handleUpdate = () => {
    window.location.href = "/updateProfile";
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col md:flex-row items-center gap-6">
          {loading ? (
            <p className="text-gray-500 text-lg">Loading...</p>
          ) : profile ? (
            <>
              {/* Image Section */}
              <div className="flex-shrink-0">
               <img
                src={profile.photo || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg"
              />
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col gap-3">
                <h2 className="text-3xl font-bold text-green-700 mb-2">User Profile</h2>
                <p><strong>Name:</strong> {profile.name || "N/A"}</p>
                <p><strong>Email:</strong> {profile.emailId || "N/A"}</p>
                <p><strong>Age:</strong> {profile.age || "N/A"}</p>
                <p><strong>Gender:</strong> {profile.gender || "N/A"}</p>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-red-500 text-lg">Could not load profile.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
