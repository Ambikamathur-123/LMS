import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../components/students/SearchBar';
import CourseCard from '../../components/students/CourseCard';
import { AppContext } from '../../context/AppContext';
import cross_icon from "../../assets/cross_icon.svg";
import Footer from '../../components/students/Footer';

const CourseList = () => {
  const navigate = useNavigate();
  const { input } = useParams();
  const { allCourses } = useContext(AppContext);
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      if (input) {
        const filtered = tempCourses.filter(item =>
          item.courseTitle.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredCourse(filtered);
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

  // ✅ THIS return should be INSIDE the function
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/')}
              >
                Home
              </span>
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-10 mb-8 text-gray-600">
            <p>{input}</p>
            <img
              src={cross_icon}
              alt=""
              className="cursor-pointer"
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse && filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="text-gray-500 mt-4">No courses found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseList;
