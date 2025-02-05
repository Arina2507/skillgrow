import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './components/Users';
import Courses from './components/Courses';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import CourseDetails from './components/CourseDetails';
import CartPage from './components/CartPage';
import TeacherDashboard from './components/TeacherDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/course/:title" element={<CourseDetails />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Header/>
                <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/users"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/courses"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <Courses />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
