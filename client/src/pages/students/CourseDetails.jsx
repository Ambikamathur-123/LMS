import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const CourseDetails = () => {
  const { id } = useParams();           // ① grab the course id from the URL
  const { allCourses } = useContext(AppContext);


  const [courseData, setCourseData] = useState(null); // ② local state
  const  fetchCourseData = async () => {
    const course = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  }
  use

}
export default CourseDetails;
