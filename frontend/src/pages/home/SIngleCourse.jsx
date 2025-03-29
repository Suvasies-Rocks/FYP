import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import RatingModal from "./RatingModal";
import CommentList from "./RatingList";
import KhaltiPayment from "./khaltiPayment";
import { Chip } from "@mui/material";

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [comment, setComment] = useState(null);
  const [chapterData, setChapterData] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const [totalVideoLength, setTotalVideoLength] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [chapId, setChapId] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);
  const [videoDurations, setVideoDurations] = useState([]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setTotalVideoLength(duration);
    }
  };

  const handlePlay = (chapterId) => {
    setChapId(chapterId);
    const storedProgress = localStorage.getItem(
      `video_progress_${id}_${chapterId}`
    );
    if (storedProgress !== null) {
      setVideoProgress((prevProgress) => ({
        ...prevProgress,
        [chapterId]: parseFloat(storedProgress),
      }));
      if (videoRef.current) {
        videoRef.current.currentTime = parseFloat(storedProgress);
      }
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl + "/user/courses/" + id);
      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error.response.data);
    }
  }, [id]);

  const fetchDataComment = useCallback(async () => {
    try {
      const response = await axios.get(baseUrl + "/user/get-comment/" + id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (error) {
      console.error("Error fetching course:", error.response.data);
    }
  }, [id]);

  const getAllCourseChapterData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/user/course-chapters/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        setChapterData(response.data);
      }
    } catch (error) {
      console.error("Error fetching course chapters:", error);
    }
  }, [id]);

  const handleEnroll = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get(baseUrl + "/user/enroll/" + id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        toast("success", response.data.message);
      } catch (error) {
        toast(error.response.data.message);
      }
    }
  };

  const [enrolledId, setEnrolledId] = useState([]);

  const getEnroll = useCallback(async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(baseUrl + "/user/getId/" + id, config);

      if (response.status === 200) {
        setEnrolledId(response.data.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  }, []);

  const [enrolled, setEnrolled] = useState([]);

  const getAllDataEnroll = useCallback(async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.get(
        baseUrl + "/user/enrolled-course",
        config
      );
      if (response.status === 200) {
        setEnrolled(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error.response.data);
    }
  }, []);
console.log(enrolled,"E")
  let filterEnrolled = enrolled?.enrollments?.filter((c) => {
    return c.courseId === Number(id);
  });

  useEffect(() => {
    fetchData();
    getAllCourseChapterData();
    fetchDataComment();
    getAllDataEnroll();
    getEnroll();
  }, [
    fetchData,
    getAllCourseChapterData,
    fetchDataComment,
    getAllDataEnroll,
    getEnroll,
  ]);

  useEffect(() => {
    // Load video progress from local storage when the component mounts
    const loadedVideoProgress = {};
    chapterData.forEach((chapter) => {
      const storedProgress = localStorage.getItem(
        `video_progress_${id}_${chapter.id}`
      );
      if (storedProgress !== null) {
        loadedVideoProgress[chapter.id] = parseFloat(storedProgress);
      }
    });
    setVideoProgress(loadedVideoProgress); // Set the video progress state

    // Calculate the total watched duration from the loaded video progress
    const totalWatchedDuration = Object.values(loadedVideoProgress).reduce(
      (acc, progress) => acc + progress,
      0
    );

    // Update the total progress percentage based on the loaded watched duration
    const progressPercentage =
      totalWatchedDuration !== 0
        ? (totalWatchedDuration / totalVideoLength) * 100
        : 0;
    setTotalProgress(progressPercentage.toFixed(2));
    localStorage.setItem(
      `video_progress_profile${id} `,
      progressPercentage.toFixed(2)
    );
  }, [chapterData, id, totalVideoLength]);

  useEffect(() => {
    localStorage.setItem(`video_progress_${id}_${chapId}`, currentTime);
  }, [currentTime, id, chapId]);

  useEffect(() => {
    // Fetch video durations for each chapter and calculate total duration
    const fetchVideoDurations = async () => {
      try {
        let totalDuration = 0;
        const durations = await Promise.all(
          chapterData.map(async (chapter) => {
            const video = document.createElement(`video`);
            video.src = baseUrl + "/" + chapter.courseVideo;
            await new Promise((resolve) => {
              video.addEventListener("loadedmetadata", () => {
                resolve();
              });
              video.load();
            });
            const duration = video.duration || 0; // Get video duration (default to 0 if not available)
            totalDuration += duration; // Add duration to total
            return duration;
          })
        );
        setTotalVideoLength(totalDuration); // Set total duration state
        return durations; // Return individual durations if needed
      } catch (error) {
        console.error("Error fetching video durations:", error);
      }
    };

    // Fetch video durations and set total duration state
    fetchVideoDurations()
      .then((durations) => {
        // Optionally, you can use individual durations if needed
        console.log("Individual durations:", durations);
        setVideoDurations(durations);
      })
      .catch((error) => {
        console.error("Error fetching video durations:", error);
      });
  }, [chapterData, id]);

  if (!course) {
    return <div>Loading...</div>;
  }
  console.log(filterEnrolled,"FE")

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex flex-wrap">
        {/* Image */}
        <div className="w-full md:w-1/2 md:pr-4 mb-4">
          {course.courseImage && (
            <img
              src={baseUrl + "/" + course.courseImage}
              alt={course.courseName}
              className="w-full h-auto object-cover rounded-md shadow-lg"
            />
          )}
        </div>
        {/* Details */}
        <div className="w-full md:w-1/2 md:pl-4 mb-4">
          <h2 className="text-3xl font-bold mb-4">{course.courseName}</h2>
          <p className="text-gray-600 mb-4">{course.courseDescription}</p>
          <p className="text-gray-800 font-bold mb-2">
            Price: ${course.coursePrice}
          </p>

          {filterEnrolled?.length > 0 ? (
            filterEnrolled[0].paymentStatus ? (
              <Chip variant="filled" color="success" label="Enrolled" />
            ) : (
              <KhaltiPayment
                id={enrolledId}
                getAllDataEnroll={getAllDataEnroll}
              />
            )
          ) : (
            <button onClick={handleEnroll}>enroll</button>
          )}
          <p>Total Progress: {totalProgress || 0}%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {chapterData.map((chapter, index) => (
          <div key={chapter.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl mb-2">{chapter.chapterTitle}</h3>
            <p className="text-gray-800 mb-4">{chapter.chapterDescription}</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <video
                ref={videoRef}
                src={baseUrl + "/" + chapter.courseVideo}
                controls={
                  filterEnrolled?.[0]?.paymentStatus !== null ||
                  chapter.chapterType === "free"
                }
                className="w-full h-full object-cover rounded-lg shadow-lg"
                onTimeUpdate={() => handleTimeUpdate(chapter.id)}
                onPlay={() => handlePlay(chapter.id)}
              />
            </div>
            {/* {videoProgress[chapter.id] !== undefined && (
              <p className="text-gray-600">
                Progress: {videoProgress[chapter.id].toFixed(2)} seconds
              </p>
            )} */}
            <p className="text-gray-600">Status: {chapter.chapterStatus}</p>
            <p className="text-gray-600">Type: {chapter.chapterType}</p>
            {filterEnrolled?.[0]?.paymentStatus === null &&
              chapter.chapterType === "premium" && (
                <p className="text-gray-600">
                  ** <span>pay to access the video!!</span> **
                </p>
              )}
            {videoDurations[index] && ( // Display video duration if available
              <p className="text-gray-600">
                Duration: {videoDurations[index].toFixed(2)} seconds
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowModal(!showModal)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease",
        }}
      >
        Add rating
      </button>

      {showModal && (
        <RatingModal
          fetchDataComment={fetchDataComment}
          onClose={() => setShowModal(false)}
        />
      )}
      <CommentList comments={comment} />
    </div>
  );
};

export default SingleCourse;
