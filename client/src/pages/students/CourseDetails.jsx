import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const course = allCourses.find((course) => course._id === id);
    setCourseData(course);
  }, [id, allCourses]);

  return courseData ? (
    <>
    <div className="relative min-h-screen">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-100 via-white to-white z-0"></div>

      {/* Page content */}
      <div className="relative z-10 flex flex-col gap-6 items-start px-8 pt-20">
     {/* left column*/}
     <div className="max-w-xl z-10 text-gary-500">
      <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-800">{courseData.courseTitle}</h1>

      <p className="pt-4 md:text-base text-sm"
       dangerouslySetInnerHTML={{__html:courseData.courseDescription.slice(0,200)}}></p>
     </div>
     {/* right column */}
     <div>
     </div>
        
      </div>
    </div>  
    </>
  ): <Loading/>
};

export default CourseDetails;
