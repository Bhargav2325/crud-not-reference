import React from "react";
import Emp from "./Emp";
import Forma from "./Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Emp />} />
          <Route path="/form" element={<Forma />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
