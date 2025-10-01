"use client";
import { AppContext } from "@/app/context/AppContext";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { assets } from "@/app/assets/assets";
import Image from "next/image";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const {
    allCourses,
    calculateRating,
    calculateNumberOfLectures,
    calculateChapterTime,
    calculateCourseDuration,
    humanizeDuration,
  } = useContext(AppContext);
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };
  useEffect(() => {
    fetchCourseData();
  }, [allCourses, id]);
  // Function to toggle section
  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left ">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-100/90 -z-10"></div>
        {/* left column */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-[35px] text-[26px] font-semibold text-gray-800">
            {courseData?.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm text-justify"
            dangerouslySetInnerHTML={{
              __html: courseData?.courseDescription.slice(0, 200) + "...",
            }}
          />
          {/* review and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Image
                  className="w-3.5 h-3.5"
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star "
                />
              ))}
            </div>
            <p className="text-blue-600 ">
              {courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? " ratings" : " rating"}
            </p>
            <p>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length > 1
                ? " students"
                : " student"}
            </p>
          </div>
          <p className="text-sm">
            course by <span className="text-blue-600 underline">LMSify</span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    onClick={() => toggleSection(index)}
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                  >
                    <div className="flex  items-center gap-2">
                      <Image
                        className={`transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow_icon "
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-1 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 py-1 md:pl-8"
                        >
                          <Image
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex justify-between items-center w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p className="text-blue-600 cursor-pointer">
                                  preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
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
            <h3 className="font-semibold text-xl text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData?.courseDescription,
              }}
            />
          </div>
        </div>

        {/* right column */}
        <div></div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default CourseDetail;
