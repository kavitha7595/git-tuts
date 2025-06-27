import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";

const AddStudent = () => {
  const { addStudent } = useStudents();

  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    attendance: "",
    grades: {
      math: "",
      physics: "",
      chemistry: "",
      biology: "",
      english: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["math", "physics", "chemistry", "biology", "english"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        grades: { ...prev.grades, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.roll.trim() ||
      formData.attendance === "" ||
      isNaN(formData.attendance) ||
      formData.attendance < 0 ||
      formData.attendance > 100
    ) {
      alert("Please fill all required fields correctly.");
      return;
    }

    addStudent(formData);
    setFormData({
      name: "",
      roll: "",
      attendance: "",
      grades: {
        math: "",
        physics: "",
        chemistry: "",
        biology: "",
        english: "",
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-gray-900 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-10 w-full max-w-4xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-10 uppercase tracking-wide">
          Add New Student
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Roll Number</label>
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              placeholder="Enter roll number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Attendance (%)</label>
            <input
              type="number"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              placeholder="0 to 100"
              min="0"
              max="100"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {Object.keys(formData.grades).map((subject) => (
            <div key={subject}>
              <label className="block text-sm font-semibold mb-1 capitalize text-gray-700">
                {subject} Grade
              </label>
              <select
                name={subject}
                value={formData.grades[subject]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select grade</option>
                <option>A+</option>
                <option>A</option>
                <option>B+</option>
                <option>B</option>
                <option>C</option>
                <option>Fail</option>
              </select>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 transition-all duration-300 text-white font-semibold py-3 px-10 rounded-full shadow-lg"
          >
            ➕ Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
