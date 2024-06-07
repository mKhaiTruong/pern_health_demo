import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import HealthLayout from "./components/HealthLayout";

function App() {
  const [healthChecks, setHealthChecks] = useState([]);

  const fetchHealthChecks = async () => {
    try {
      const response = await fetch("http://localhost:9000/health", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const allData = await response.json();

      setHealthChecks(
        allData.map((item) => ({
          key: item.id,
          hostName: item.host_name,
          timestamp: formatTimestamp(item.timestamp),
          status: item.status,
          responseTime: item.response_time,
          cpuUsage: item.cpu_usage,
          memoryUsage: item.memory_usage,
        }))
      );
      
    } catch (error) {
      console.error(error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };
  
  useEffect(() => {
    fetchHealthChecks();
  }, []);

  return (
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <HealthLayout
                healthChecks={healthChecks}
                fetchHealthChecks={fetchHealthChecks}
              />
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
