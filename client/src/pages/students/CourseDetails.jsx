import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  const { id } = useParams();
  const { allCourses, calculateRating ,calculateChapterTime, calculateCourseDuration,calculateNoOfLectures} = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const course = allCourses.find((course) => course._id === id);
    setCourseData(course);
  }, [id, allCourses]);

  const toggleSection = (index)=>{
    setOpenSections((prev)=>(
      {
        ...prev,[index]: !prev[index],
      }
    ));
  };

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
  {/* review and ratings */}
    <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
              <p>{calculateRating(courseData)}</p>
              <div className='flex'>
                {[...Array(5)].map((_,i)=>(<img  key={i} src={i< Math.floor(calculateRating(courseData))?assets.star :assets.star_blank} alt=""className='w-3.5 h-3.5'/>))}
              </div>
               <p className='text-blue-600'>({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
               <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1?'students':'student'}</p>
              </div>
              <p className="text-sm">Course by<span className="text-blue-600 underline"> TechStreak</span></p>
              <div className="pt-8 text-gray-800">
                <h2 className="text-xl font-semibold">Course structure</h2>
                <div className="pt-5">
                  {courseData.courseContent.map((chapter, index)=>(
                    <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                      <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" onClick={()=>toggleSection(index)}>
                        <div className="flex items-center gap-2">
                          <img className={`transform transition-transform ${openSections[index] ?'rotate-180': ''}`}
                          src={assets.down_arrow_icon} alt="arrow icon"/>
                          <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                        </div>
                        <p className="text-sm md:text-default">{chapter.chapterContent.length} lectures -{calculateChapterTime(chapter)} </p>
                      </div>
                     <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>

                      <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                        {chapter.chapterContent.map((lecture, i)=>(
                          <li key={i} className="flex items-start gap-2 py-1">
                            <img src={assets.play_icon} alt="play icon"className="w-4 h-4 mt-1"/>
                            <div className="flex-items-center justify-between w-full text-gray-800 text-xs md:text-default">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-2">
                                {lecture.isPreviewFree && <p className="text-blue-500 cursor-pointer">Preview</p>}
                                <p>{humanizeDuration(lecture.lectureDuration*60*1000,{units:['h','m']})}</p>
                              </div>
                            </div>
                          </li>

                        ))}
                      </ul>
                    </div>
                    </div>

                  ))}

                </div>

              </div>
              <div className="py-20 text-sm md:text-default">
                <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
                <p className="pt-3"
       dangerouslySetInnerHTML={{__html:courseData.courseDescription}}></p>
              </div>

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
