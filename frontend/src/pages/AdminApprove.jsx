
import React, { useEffect, useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AdminApprove() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApprovedMaterials = async () => {
    try {
      const response = await fetch(`${backendUrl}getMaterial`);
      if (!response.ok) throw new Error("Failed to fetch approved materials");

      const data = await response.json();
      setMaterials(Array.isArray(data.result) ? data.result : []);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedMaterials();
  }, []);

  if (loading) return <p>Loading approved materials...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Approved Materials
      </h1>

      {materials.length === 0 ? (
        <p className="text-gray-500 text-center">
          No approved materials found.
        </p>
      ) : (
        <div className="overflow-x-auto max-w-full p-2">
          <table className="min-w-full border border-gray-200 rounded-lg table-auto">
            <thead className="bg-gray-100 text-green-800">
              <tr>
                <th className="px-4 py-2 border text-center">S.No</th>
                <th className="px-4 py-2 border text-left">Title</th>
                <th className="px-4 py-2 border text-left">Subject</th>
                <th className="px-4 py-2 border text-left">Description</th>
                <th className="px-4 py-2 border text-left">Uploaded By</th>
                <th className="px-4 py-2 border text-center">View</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={material._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border truncate max-w-xs">
                    {material.title || "Untitled"}
                  </td>
                  <td className="px-4 py-2 border">{material.subject || "N/A"}</td>
                  <td className="px-4 py-2 border break-words max-w-sm">
                    {material.description || "No description"}
                  </td>
                  <td className="px-4 py-2 border">
                    {material.uploadedBy?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {material.linkOrFile ? (
                      <button
                        className="bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-800"
                        onClick={() =>
                          window.open(material.linkOrFile, "_blank")
                        }
                      >
                        View
                      </button>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
