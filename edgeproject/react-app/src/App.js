import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function App() {
  const [arraySize, setArraySize] = useState("");
  const [mode, setMode] = useState("local"); // State for selecting the mode
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setArraySize(e.target.value);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await fetch("http://192.168.75.1:5000/sort", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ n: parseInt(arraySize, 10), mode }), // Include mode in the request
    });

    const result = await response.json();
    setIsLoading(false);
    navigate('/result', { state: { result} });
  };

  return (
    <div className="app-container">
      <h1 className="title">
        <span>Fog Computing Sorting</span>
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

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Enter array size:
              <input
                type="number"
                name="arraySize"
                value={arraySize}
                onChange={handleChange}
                placeholder="Array Size"
                required
              />
            </label>
            <label>
              Select mode:
              <select value={mode} onChange={handleModeChange}>
                <option value="local">Local Sorting</option>
                <option value="distributed">Distributed Sorting</option>
              </select>
            </label>
          </div>
          <button type="submit">Sort</button>
        </form>
      </div>
    </div>
  );
}

export default App;
