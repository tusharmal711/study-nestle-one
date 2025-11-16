import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function UpdateProfile() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [preview, setPreview] = useState("");

  // Fetch current profile
  const getUserProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}getProfile`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      if (data?.data) {
        setProfile({
          name: data.data.name || "",
          age: data.data.age || "",
          gender: data.data.gender || "",
          photo: data.data.photo || "",
        });
        setPreview(data.data.photo || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files[0]) {
      setProfile({ ...profile, photo: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("age", profile.age);
      formData.append("gender", profile.gender);
      if (profile.photo instanceof File) formData.append("photo", profile.photo);

      const res = await fetch(`${backendUrl}updateProfile`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
        
      });

      if (!res.ok) throw new Error("Failed to update profile");
      alert("Profile updated successfully!");
      window.location.href = "/getProfile"; // redirect to profile page
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
          {loading ? (
            <p className="text-gray-500 text-lg">Loading profile...</p>
          ) : (
            <form
              className="flex flex-col md:flex-row items-center gap-6"
              onSubmit={handleSubmit}
            >
              {/* Image Preview */}
              <div className="flex-shrink-0">
                <img
                  src={preview || "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
                  alt=""
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg mb-4 md:mb-0"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>

              {/* Form Fields */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                <h2 className="text-3xl font-bold text-green-700 mb-2">Update Profile</h2>

                <div>
                  <label className="block mb-1 font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    min="18"
                    max="70"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Gender</label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Update Profile"}
                  </button>
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/getProfile")}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
