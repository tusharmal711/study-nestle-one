import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const signupSchema = z.object({
  emailId: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password should contain at least 8 characters"),
});

function AdminLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${backendUrl}adminlogin`, {
        method: "POST",
        credentials: "include", // ✅ Important: allow cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert(result.message || "Login failed");
        return;
      }

      // ✅ If login successful, redirect to dashboard
      navigate("/adminDashboard");
    } catch (err) {
      console.error("Admin login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left panel - Login Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-4xl font-semibold text-green-800 mb-6">
              Admin LogIn
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
              <div className="space-y-2">
                <label className="block text-green-700 font-medium">EMAIL</label>
                <input
                  {...register("emailId")}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.emailId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.emailId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-green-700 font-medium">
                  PASSWORD
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors mt-6 disabled:opacity-60"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>

          {/* Right panel - Image */}
          <div className="md:w-1/2 relative">
            <img
              src="https://imagecdn.99acres.com//microsite/wp-content/blogs.dir/6161/files/2023/10/Vertical-Garden.jpg"
              alt="Education"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;
