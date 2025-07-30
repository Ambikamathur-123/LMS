import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Home from "./pages/students/Home";
import CourseList from "./pages/students/CourseList";
import CourseDetails from "./pages/students/CourseDetails";
import MyEnrollements from "./pages/students/MyEnrollements";
import Player from "./pages/students/Player";

import Educator from "./pages/educator/Educator";
import DashBoard from "./pages/educator/DashBoard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Navbar from './components/students/Navbar';

const App = () => {
   const location = useLocation();
  const isEducatorRoute = location.pathname.startsWith('/educator');

  
  return (
    <div className="text-default min-h-screen bg-white">
      {!isEducatorRoute &&<Navbar/> }
      
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollements" element={<MyEnrollements />} />
        <Route path="/player/:courseId" element={<Player />} />

        {/* Educator Landing Page */}
        <Route path="/educator" element={<Educator />} />

        {/* Educator Dashboard with Nested Routes */}
        <Route path="/educator/dashboard" element={<DashBoard />}>
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
 