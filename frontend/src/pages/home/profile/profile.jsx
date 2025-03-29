import { useEffect, useState } from "react";
import CoursesTabs from "./profileTabs";
import UserDetails from "./userDetails";
import { baseUrl } from "../../../config";
import axios from "axios";


const UserProfilePage = () => {
  const [teachers, setTeachers] = useState({});
  const [enrolled, setEnrolled] = useState([]);


  const getAllData = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/user/profile", config);
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };
  const getAllDataEnroll = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/user/enrolled-course", config);
      if (response.status === 200) {
        setEnrolled(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  };

  useEffect(() => {
    getAllData();
    getAllDataEnroll()
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col ">
        {/* User Details */}
        <div className="md:w-1/3">
          <UserDetails teachers={teachers} getAllData={getAllData} />
        </div>

        {/* Courses Tabs */}
        <div className="md:w-2/3">
          <CoursesTabs courses={enrolled.enrollments} />
          {/* Content for enrolled/completed courses will go here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
