import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form1 from './Form1';
import Form2 from './Form2';
import Success from './Success';
import Form3 from './Form3';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
        <Route path="/form3" element={<Form3 />} />
        <Route path="/success" element={<Success />} />

      </Routes>
    </Router>
  );
};

export default App;
