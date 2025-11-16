import React, { useState, useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
function SearchStudyMaterial() {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const res = await fetch(`${backendUrl}getMaterial`, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
          }, 
        });

        const data = await res.json();
        setMaterials(Array.isArray(data.result) ? data.result : []);
      } catch (err) {
        console.error("Error fetching study materials:", err);
        setMaterials([]);
      }
    };

    fetchStudyMaterials();
  }, []);

  // 🔹 filter materials by title, description, or subject
  const filteredMaterials = materials.filter((material) =>
    [material.title, material.description, material.subject]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      
      <main className="flex-grow ">
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 ">
         
                <h1 className="text-4xl font-bold text-green-800 mb-4 text-center">Study Materials</h1>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto text-center">
                  Access a wide range of educational resources shared by educators and students
                </p>

          {/* 🔹 Search Input */}
        
            <div className="max-w-2xl mx-auto relative pb-6">
                  <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden border-2 border-green-700">
                    <input
                        type="text"
                        placeholder="Search by title, subject, description, or uploader..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-4 px-6 text-gray-700 focus:outline-none"
                    />
                    <div className="pr-4">
                      <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </div>
            </div>

          {filteredMaterials.length === 0 ? (
            <p className="text-gray-600">No study materials found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <div
                  key={material._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {material.subject}
                    </span>
                    <span className="text-xs text-gray-500">
                      {material.createdAt
                        ? new Date(material.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {material.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{material.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Uploaded by 
                     <span className="ml-1">{material.uploadedBy?.name || "Unknown"}</span>
                    </span>
                    <a
                      href={material.linkOrFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-700 hover:text-green-800 font-medium"
                    >
                      View PDF
                    </a>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
    </>
  );
}

export default SearchStudyMaterial;
