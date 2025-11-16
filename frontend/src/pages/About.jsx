import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function About({ isAuthenticated, setIsAuthenticated }) {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated}   />
      <main className="flex-grow">
        <div className="min-h-screen bg-gray-100 py-12 px-6 lg:px-20">
          <h1 className="text-3xl font-bold text-green-800 mb-6">About StudyNestle</h1>
          
          <p className="text-gray-700 mb-4">
            The <strong>StudyNestle</strong> is designed to provide students 
            and learners with easy access to important learning resources. 
            Teachers, mentors, and students can upload subject-wise notes, PDFs, 
            and reference documents which can be accessed anytime, anywhere.
          </p>

          <p className="text-gray-700 mb-4">
            Our goal is to create a centralized hub of knowledge where 
            everyone can contribute and benefit. Whether you are preparing for exams, 
            revising concepts, or exploring new topics, this platform will help you 
            find what you need quickly.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Upload and share PDFs, notes, and other study resources.</li>
            <li>Filter and search study materials by subject, title, or description.</li>
            <li>Secure storage and access via Cloudinary integration.</li>
            <li>Access uploaded resources anytime, anywhere.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-800 mt-8 mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            To make education accessible and collaborative by allowing 
            students and educators to share knowledge easily. We believe in 
            building a strong learning community where resources are free 
            and open for everyone.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default About;