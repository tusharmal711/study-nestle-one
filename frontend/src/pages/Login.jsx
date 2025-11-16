import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import Header from './Header';
import Footer from './Footer';

const signupSchema = z.object({
  emailId: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password should contain at least 8 characters")
});

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Login({ setIsAuthenticated }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${backendUrl}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailId: data.emailId,
          password: data.password,
        }),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        console.log('Login successful');
        navigate('/');
      } else {
        alert('Invalid credentials');
        console.error('Login failed:', result.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Left panel - Login Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-4xl font-semibold text-green-800 mb-6">Log In</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
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
                  placeholder="Enter your password"
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
                Log In
              </button>
            </form>

            {/* Sign Up button for small screens */}
            <div className="text-center mt-6 md:hidden">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-green-700 font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {/* Right panel - Image with Sign Up content (only for md and larger) */}
          <div className="hidden md:block md:w-1/2 relative">
            <img
              src="https://imagecdn.99acres.com//microsite/wp-content/blogs.dir/6161/files/2023/10/Vertical-Garden.jpg"
              alt="Education"
              className="w-full h-full object-cover absolute inset-0"
            />

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                <p className="mb-6">Don’t have an account? Sign up to continue your journey.</p>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-2 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
                >
                  Sign Up
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

export default Login;
