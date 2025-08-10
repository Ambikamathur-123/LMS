import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import {Line} from 'rc-progress'
import Footer from '../../components/students/Footer';

const MyEnrollements = () => {
  const { enrolledCourses, calculateCourseDuration } = useContext(AppContext);
  const navigate = useNavigate();

  const handleOngoingClick = (courseId) => {
    navigate(`/player/${courseId}`);
  };

  return (
    <div className="md:px-36 px-8 pt-10">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
        <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
          <tr>
            <th className="px-4 py-3 font-semibold truncate">Course</th>
            <th className="px-4 py-3 font-semibold truncate">Duration</th>
            <th className="px-4 py-3 font-semibold truncate">Completed</th>
            <th className="px-4 py-3 font-semibold truncate">Status</th>
          </tr>
        </thead>

        <tbody>
          {enrolledCourses && enrolledCourses.length > 0 ? (
            enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b">
                {/* Course column */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-14 sm:w-24 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{course.courseTitle}</p>
                    <Line
                     strokeWidth={2} percent={50}className="bg-gray-300 rounded-full" />
                  </div>
                </td>

                {/* Duration */}
                <td className="px-4 py-3">
                  {calculateCourseDuration(course)}
                </td>

                {/* Completed lectures */}
                <td className="px-4 py-3">
                  {course.completedLectures || 0} /{" "}
                  {course.totalLectures || 0} Lectures
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleOngoingClick(course._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1 rounded transition"
                  >
                    {course.status || "Ongoing"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No courses enrolled yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Footer/>
    </div>
    
  );
};

export default MyEnrollements;
