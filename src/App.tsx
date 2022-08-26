import { Routes, Route, Link, useLocation } from "react-router-dom";

import "./App.css";
import { PerfMeasure } from "./features/perfMeasure/perfMeasure";
import { TestDataList } from "./features/testData/testData";

const MAIN_PATH: string = "/";
const TEST_PATH: string = "/test-data";
const PERFORMANCE_PATH: string = "/performance";

const NavBar: React.FC = () => {
  const location = useLocation();
  return (
    <span className="menu-container">
      <Link
        className={
          location.pathname === MAIN_PATH ? "route-link active" : "route-link"
        }
        to={MAIN_PATH}
      >
        Home
      </Link>
      <Link
        className={
          location.pathname === TEST_PATH ? "route-link active" : "route-link"
        }
        to={TEST_PATH}
      >
        Test data
      </Link>
      <Link
        className={
          location.pathname === PERFORMANCE_PATH
            ? "route-link active"
            : "route-link"
        }
        to={PERFORMANCE_PATH}
      >
        Performance measurements
      </Link>
    </span>
  );
};

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <span>
        <p>Welcome to list rendering performance comparison app!</p>
        <p>
          Try opening <Link to={TEST_PATH}>test data</Link> page and then check
          out the <Link to={PERFORMANCE_PATH}>performance measuring</Link>{" "}
          results
        </p>
      </span>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="test-data" element={<TestDataList />} />
          <Route path="performance" element={<PerfMeasure />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
