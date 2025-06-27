import React, { createContext, useContext, useState, useEffect } from "react";

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    // ✅ Load from localStorage initially
    const stored = localStorage.getItem("students");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const deleteStudent = (roll) => {
    setStudents((prev) => prev.filter((s) => s.roll !== roll));
  };

  const editStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.roll === updatedStudent.roll ? updatedStudent : s))
    );
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, deleteStudent, editStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};
