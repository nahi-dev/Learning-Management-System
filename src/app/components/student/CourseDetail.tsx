import { AppContext } from "@/app/context/AppContext";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const CourseDetail = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { allCourses } = useContext(AppContext);
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };
  useEffect(() => {
    fetchCourseData();
  }, [allCourses, id]);
  return (
    <div>
      {/* left column */}
      {/* right column */}
    </div>
  );
};

export default CourseDetail;
