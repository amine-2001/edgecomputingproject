import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Result.css"; 

function ResultPage() {
  const location = useLocation();
  const { result } = location.state;

  // Manage loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate intensive processing or fetching result
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false when done
    }, 3000); // Adjust this time to match actual processing duration

    return () => clearTimeout(timer); // Cleanup if the component unmounts
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <h1 className="title">Loading...</h1>
      ) : (
        <>
          <h1 className="title">
            <span>Sorted Array</span>
          </h1>
          <span className="run run-left" style={{ animationDelay: "0s" }}></span>
          <span className="run run-right" style={{ animationDelay: "0.2s" }}></span>
          <span className="run run-left" style={{ animationDelay: "0.4s" }}></span>
          <span className="run run-right" style={{ animationDelay: "0.6s" }}></span>
          <span className="run run-left" style={{ animationDelay: "0.8s" }}></span>
          <span className="run run-right" style={{ animationDelay: "1s" }}></span>
          <span className="run run-left" style={{ animationDelay: "1.2s" }}></span>
          <span className="run run-right" style={{ animationDelay: "1.4s" }}></span>
          <span className="run run-left" style={{ animationDelay: "1.6s" }}></span>
          <span className="run run-right" style={{ animationDelay: "1.8s" }}></span>
          <span className="run run-left" style={{ animationDelay: "2s" }}></span>
          <span className="run run-right" style={{ animationDelay: "2.2s" }}></span>
          <span className="run run-left" style={{ animationDelay: "2.4s" }}></span>
          <span className="run run-right" style={{ animationDelay: "2.6s" }}></span>
          <span className="run run-left" style={{ animationDelay: "2.8s" }}></span>
          <span className="run run-right" style={{ animationDelay: "3s" }}></span>
          <div className="form-container">
            <pre>{JSON.stringify(result.sorted_data, null, 2)}</pre>
            {result.local_execution_time && result.remote_execution_time_1 ? (
  
            <>
              <pre>
                Server execution time: {result.local_execution_time.toFixed(4)} seconds
                <br />
                Remote 1 execution time: {result.remote_execution_time_1.toFixed(4)} seconds
                <br />
                Total execution time: {result.total_execution_time.toFixed(4)} seconds
              </pre>
            </>
          ) : (
            // Mode local : afficher uniquement le temps d'exécution total
            <>
              <pre>
                Total execution time: {result.total_execution_time.toFixed(4)} seconds
              </pre>
            </>
          )}

            
            <Link to="/"><button>Back to Sort Form</button></Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ResultPage;
