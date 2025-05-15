import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/add-student"
            element={
              <PrivateRoute>
                <AddStudent />
              </PrivateRoute>
            }
          />
        </Routes>
  );
}

export default App;