import React, { useState } from "react";
import { useStudents } from "../context/StudentContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaCrown, FaChartBar } from "react-icons/fa";

const Reports = () => {
  const { students } = useStudents();
  const [selectedSubject, setSelectedSubject] = useState("math");

  const gradeOrder = ["A+", "A", "B+", "B", "C", "Fail"];

  const filteredStudents = [...students]
    .filter((s) => s.grades[selectedSubject])
    .sort(
      (a, b) =>
        gradeOrder.indexOf(a.grades[selectedSubject]) -
        gradeOrder.indexOf(b.grades[selectedSubject])
    )
    .slice(0, 5);

  const gradeDistribution = gradeOrder.map((grade) => ({
    grade,
    students: students.filter((s) => s.grades[selectedSubject] === grade).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-cyan-400 tracking-wide uppercase">
        📘 Subject Reports
      </h1>

      {/* Subject Dropdown */}
      <div className="max-w-md mx-auto mb-12">
        <label className="block text-lg font-semibold text-gray-300 mb-2">
          Select Subject
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white text-gray-800 font-medium shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="math">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="english">English</option>
        </select>
      </div>

      {/* Top 5 Students */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 text-white p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto mb-16 transition-all">
        <h2 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-2 border-b border-cyan-400 pb-2">
          <FaCrown className="text-yellow-400" />
          Top 5 Students in <span className="capitalize ml-2">{selectedSubject}</span>
        </h2>
        {filteredStudents.length === 0 ? (
          <p className="text-center text-gray-300">No student data available.</p>
        ) : (
          <ul className="space-y-4">
            {filteredStudents.map((student, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-5 py-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 hover:scale-[1.02] transition-all shadow-lg"
              >
                <span className="text-lg font-semibold">{student.name}</span>
                <span className="bg-emerald-500 text-white px-4 py-1 rounded-full font-semibold text-sm shadow-md">
                  {student.grades[selectedSubject]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Grade Chart */}
      <div className="bg-white/10 border border-white/20 text-white p-10 rounded-2xl shadow-2xl max-w-5xl mx-auto backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-8 text-cyan-300 flex items-center gap-2 border-b pb-2 border-cyan-400">
          <FaChartBar className="text-lime-400" />
          Grade Distribution Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gradeDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="grade" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar
              dataKey="students"
              fill="#22d3ee"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
