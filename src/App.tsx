import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

const Home = ({}) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Counter />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <span>
        <span>Links </span>
        <Link className="App-link" to="/test-data">
          Test data
        </Link>
        <span> </span>
        <Link className="App-link" to="/performance">
          Performance measurements
        </Link>
      </span>
    </header>
  );
};

const TestData = ({}) => {
  return <div>test data</div>;
};

const PerfMeasurements = ({}) => {
  return <div>perf measurments</div>;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="test-data" element={<TestData />} />
        <Route path="performance" element={<PerfMeasurements />} />
      </Routes>
    </div>
  );
}

export default App;
