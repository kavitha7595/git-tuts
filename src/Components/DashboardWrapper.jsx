import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardWrapper = () => {
  const { hasVisitedDashboard, setHasVisitedDashboard } = useAuth();

  useEffect(() => {
    // ✅ Mark the dashboard as visited only once after login
    if (!hasVisitedDashboard) {
      setHasVisitedDashboard(true);
    }
  }, [hasVisitedDashboard, setHasVisitedDashboard]);

  // ❌ If already visited, redirect to /reports
  if (hasVisitedDashboard) {
    return <Navigate to="/reports" replace />;
  }

  // ✅ First time — show the Dashboard
  return <Dashboard />;
};

export default DashboardWrapper;
