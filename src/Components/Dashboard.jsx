import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const gradeColors = {
  "A+": "bg-green-500",
  A: "bg-green-400",
  "B+": "bg-blue-400",
  B: "bg-yellow-400",
  C: "bg-orange-400",
  Fail: "bg-red-500",
};

const subjects = ["math", "physics", "chemistry", "biology", "english"];

const Dashboard = () => {
  const { students, deleteStudent, editStudent } = useStudents();
  const [editingRoll, setEditingRoll] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      subjectFilter === "All" || student.grades[subjectFilter];

    const matchesGrade =
      gradeFilter === "All" ||
      (subjectFilter !== "All" &&
        student.grades[subjectFilter] === gradeFilter);

    return matchesSearch && matchesSubject && matchesGrade;
  });

  const totalStudents = students.length;
  const avgAttendance =
    totalStudents === 0
      ? 0
      : students.reduce((sum, s) => sum + Number(s.attendance), 0) /
        totalStudents;

  const gradeDistribution = ["A+", "A", "B+", "B", "C", "Fail"].map((grade) => ({
    grade,
    count: students.filter((s) =>
      subjectFilter === "All"
        ? Object.values(s.grades).includes(grade)
        : s.grades[subjectFilter] === grade
    ).length,
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-6">
      {/* Left: Student Table */}
      <div className="w-full md:w-2/3">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Name/Roll No."
            className="px-4 py-2 rounded bg-gray-800 border border-gray-700 w-1/2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            <select
              className="bg-gray-800 border border-gray-700 px-2 py-1 rounded"
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="All">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub.charAt(0).toUpperCase() + sub.slice(1)}
                </option>
              ))}
            </select>
            <select
              className="bg-gray-800 border border-gray-700 px-2 py-1 rounded"
              onChange={(e) => setGradeFilter(e.target.value)}
            >
              <option value="All">All Grades</option>
              {["A+", "A", "B+", "B", "C", "Fail"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Roll No</th>
                {subjects.map((sub) => (
                  <th key={sub} className="px-4 py-2 text-left capitalize">
                    {sub}
                  </th>
                ))}
                <th className="px-4 py-2 text-left">Attendance</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) =>
                editingRoll === student.roll ? (
                  <tr key={index} className="border-b border-gray-700 bg-gray-800">
                    <td className="px-4 py-2">
                      <input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-2">{student.roll}</td>
                    {subjects.map((sub) => (
                      <td key={sub} className="px-4 py-2">
                        <input
                          value={editForm.grades[sub] || ""}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              grades: {
                                ...editForm.grades,
                                [sub]: e.target.value,
                              },
                            })
                          }
                          className="bg-gray-700 text-white px-2 py-1 rounded w-full text-xs"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        value={editForm.attendance}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            attendance: e.target.value,
                          })
                        }
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full text-xs"
                      />
                      <div className="text-xs mt-1">{editForm.attendance}%</div>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => {
                          editStudent(editForm);
                          setEditingRoll(null);
                        }}
                        className="bg-green-500 px-2 py-1 text-xs rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingRoll(null)}
                        className="bg-gray-500 px-2 py-1 text-xs rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.roll}</td>
                    {subjects.map((sub) => (
                      <td key={sub} className="px-4 py-2">
                        <span
                          className={`text-white px-2 py-1 rounded text-xs ${
                            gradeColors[student.grades[sub]] || "bg-gray-600"
                          }`}
                        >
                          {student.grades[sub] || "-"}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-2">
                      <div className="w-full bg-gray-700 h-3 rounded">
                        <div
                          className="bg-green-500 h-3 rounded"
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs ml-1">{student.attendance}%</span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingRoll(student.roll);
                          setEditForm({ ...student });
                        }}
                        className="bg-yellow-400 text-black px-2 py-1 text-xs rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudent(student.roll)}
                        className="bg-red-600 px-2 py-1 text-xs rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan={subjects.length + 3}
                    className="text-center py-4 text-gray-400"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Statistics Panel */}
      <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">📊 Overall Statistics</h2>
        <p className="mb-2">
          Total Students: <strong>{totalStudents}</strong>
        </p>
        <p className="mb-2">Average Attendance:</p>
        <div className="w-full bg-gray-600 h-4 rounded mb-4">
          <div
            className="bg-blue-500 h-4 rounded"
            style={{ width: `${avgAttendance.toFixed(1)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-300 mb-6">
          {avgAttendance.toFixed(1)}%
        </p>

        <h3 className="font-semibold mb-2">Performance Overview</h3>
        <ul className="mb-6 text-sm">
          {gradeDistribution.map((item) => (
            <li key={item.grade} className="flex justify-between py-1">
              <span>{item.grade}</span>
              <span>{item.count}</span>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold mb-2">Subject Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={gradeDistribution}>
            <XAxis dataKey="grade" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="count" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
