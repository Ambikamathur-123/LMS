import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const CourseDetails = () => {
  const { id } = useParams();           // ① grab the course id from the URL
  const { allCourses } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null); // ② local state

  // ③ look up the course when the component mounts OR when allCourses/id changes
  useEffect(() => {
    if (!allCourses?.length) return;          // guard if courses still loading
    const match = allCourses.find(c => c._id === id);
    setCourseData(match || null);
  }, [allCourses, id]);

  /* ④ Give the user immediate feedback (an HCI best practice) */
  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading course details…</p>
      </div>
    );
  }

  /* ⑤ Render once the data is available */
  return (
    <div className="relative flex flex-col-reverse gap-10 md:flex-row md:px-36 px-8 md:pt-30 pt-20">
      {/* background tint */}
      <div className="absolute inset-0 h-[300px] -z-10 bg-gradient-to-b from-cyan-100/70" />

      {/* left column – text */}
      <div className="flex-1 space-y-4 text-left">
        <h1 className="text-3xl font-bold">{courseData.title}</h1>
        <p className="text-gray-700">{courseData.description}</p>

        {/* quick facts */}
        <p className="text-sm text-gray-500">
          Instructor: {courseData.instructor}
        </p>
        <p className="text-sm text-gray-500">
          Duration: {courseData.duration}
        </p>
      </div>

      {/* right column – image */}
      <div className="flex-1">
        <img
          src={courseData.thumbnail}
          alt={courseData.title}
          className="w-full h-auto rounded-xl shadow-md"
        />
      </div>
    </div>
  );
};

export default CourseDetails;
