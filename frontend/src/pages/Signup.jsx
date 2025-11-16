import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import Header from './Header';
import Footer from './Footer';

const signupSchema = z.object({
  name: z.string().min(3, "Name should contain at least 3 characters"),
  emailId: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password should contain at least 8 characters"),
});

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      emailId: data.emailId,
      password: data.password,
    };

    try {
      const response = await fetch(`${backendUrl}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        console.log('User registered successfully');
        navigate('/login');
      } else {
        console.error('Registration failed:', result.error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Left panel - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center md:text-left">
              Create Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-green-700 font-medium">FULL NAME</label>
                <input
                  {...register('name')}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-green-700 font-medium">EMAIL</label>
                <input
                  {...register('emailId')}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.emailId && (
                  <p className="mt-1 text-sm text-red-600">{errors.emailId.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-green-700 font-medium">PASSWORD</label>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors mt-6"
              >
                Sign Up
              </button>
            </form>

            {/* Link to login (visible only on small screens) */}
            <div className="text-center mt-6 md:hidden">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-green-700 font-semibold hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>

          {/* Right panel - Image with Sign In (visible only on md and up) */}
          <div className="hidden md:block md:w-1/2 relative">
            <img
              src="https://imagecdn.99acres.com//microsite/wp-content/blogs.dir/6161/files/2023/10/Vertical-Garden.jpg"
              alt="Education"
              className="w-full h-full object-cover absolute inset-0"
            />

            <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/40">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                <p className="mb-6">
                  Already have an account? Sign in to continue your journey.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
