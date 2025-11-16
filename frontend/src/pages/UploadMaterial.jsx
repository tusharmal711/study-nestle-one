import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function StudyMaterialForm({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    linkOrFile: null,
  });

  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Protected route: check if user is logged in
  useEffect(() => {
    
    const checkAuth = async () => {
      try {
        const res = await fetch(`${backendUrl}checkAuth`, {
          credentials: "include",
        });
        const data = await res.json();
        
        if (!data.loggedIn) {
          navigate("/login"); // redirect if not logged in
        }
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      setFileError("Please select a PDF or image file (JPEG, JPG, PNG)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("File size must be less than 10MB");
      return;
    }

    setFileError("");
    setFormData((prev) => ({ ...prev, linkOrFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.linkOrFile) return setFileError("Please select a file");
    if (fileError) return;

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("subject", formData.subject);
      data.append("file", formData.linkOrFile); // must match multer field

      const res = await fetch(`${backendUrl}registerMaterial`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to upload");

      alert("Study material uploaded successfully! Waiting for admin approval.");

      // Reset form
      setFormData({ title: "", description: "", subject: "", linkOrFile: null });
      document.getElementById("file-input").value = "";
    } catch (err) {
      setFileError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header  isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} />
      <main className="flex-grow">
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-700">Upload Study Material</h2>
              <p className="mt-2 text-gray-600">Share educational resources with the community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-green-700 focus:border-green-500"
                  placeholder="Enter a descriptive title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-500"
                  placeholder="Provide details about this study material"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-500"
                  placeholder="e.g., Mathematics, Physics, etc."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">File Upload *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <input
                      id="file-input"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="file-input"
                      className="cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500"
                    >
                      Select a file
                    </label>
                    {formData.linkOrFile && (
                      <p className="text-sm text-green-600 mt-2">Selected file: {formData.linkOrFile.name}</p>
                    )}
                    {fileError && <p className="text-sm text-red-600 mt-2">{fileError}</p>}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-green-700 hover:bg-gray-50"
                  onClick={() => {
                    setFormData({ title: "", description: "", subject: "", linkOrFile: null });
                    setFileError("");
                    document.getElementById("file-input").value = "";
                  }}
                >
                  Reset Form
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    isSubmitting ? "bg-green-400" : "bg-green-700 hover:bg-green-800"
                  }`}
                >
                  {isSubmitting ? "Uploading..." : "Upload Material"}
                </button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Upload Guidelines</h3>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Only upload PDF or image files (JPG, JPEG, PNG)</li>
                <li>Maximum file size is 10MB</li>
                <li>Ensure you have the right to share the material</li>
                <li>Provide accurate descriptions to help others find your content</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default StudyMaterialForm;
