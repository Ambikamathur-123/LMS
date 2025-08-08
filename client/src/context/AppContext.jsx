import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  // Simulate fetch
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Calculate average rating
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) return 0;
    const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return (total / course.courseRatings.length).toFixed(1);
  };

  // ✅ FIXED: Calculate time for one chapter
  const calculateChapterTime = (chapter) => {
    if (!chapter?.chapterContent) return "0m";
    let time = 0;
    chapter.chapterContent.forEach((lecture) => {
      time += lecture?.lectureDuration || 0;
    });
    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };

  // Calculate full course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course?.courseContent?.forEach((chapter) => {
      chapter?.chapterContent?.forEach((lecture) => {
        time += lecture?.lectureDuration || 0;
      });
    });
    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };

  // Calculate total lectures
  const calculateNoOfLectures = (course) => {
    let total = 0;
    course?.courseContent?.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        total += chapter.chapterContent.length;
      }
    });
    return total;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currency,
        allCourses,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
