import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Contact({ isAuthenticated, setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // TODO: Send to backend API if required
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Header  isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}  />
      <main className="flex-grow">
        <div className="min-h-screen bg-gray-100 py-12 px-6 lg:px-20 ">
          <h1 className="text-4xl font-bold text-green-800 mb-6 ">Contact Us</h1>

          <p className="text-gray-700 mb-8">
            Have questions, feedback, or suggestions? Fill out the form below and we’ll get back to you soon.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
