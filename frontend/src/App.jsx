import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Google from "./pages/auth/Google";
import Dashboard from "./pages/dashboard/Dashboard";
import AddCategory from "./pages/dashboard/category/AddCategory";
import AddChapter from "./pages/dashboard/chapter/AddChapters";
import HomeDashboard from "./pages/dashboard/Home";
import AddTeacherAdminForm from "./pages/dashboard/Teacher/AddTeacherForm";
import TeacherListTable from "./pages/dashboard/Teacher/TeacherList";
import UpdateTeacherAdminForm from "./pages/dashboard/Teacher/UpdateTeacherForm";
import CategoryListTable from "./pages/dashboard/category/CategoryList";
import AddCourseForm from "./pages/dashboard/course/AddCourse";
import CourseListTable from "./pages/dashboard/course/GetCourseList";
import SingleCoursePage from "./pages/dashboard/course/SingleCourse";
// import AddCategory from './pages/dashboard/category/AddCategory'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./pages/home/Layout";
import SIngleCourse from "./pages/home/SIngleCourse";
import TeacherDashboard from "./pages/teacherDashboard/TeacherDashboard";
import HomeTeacherDashboard from "./pages/teacherDashboard/home/Home";
import CourseListTableAdmin from "./pages/dashboard/course/AdminCourse";
import UserProfilePage from "./pages/home/profile/profile";
import RequireAuth from "./pages/protectedRoutes";
import UnauthorizedPage from "./pages/Unauthorize";
import ForgotPassword from "./pages/auth/ForgetPassord";
import ChangePassword from "./pages/auth/ChangePassword";



function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />

        
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<ForgotPassword />} />
        <Route path="/password-reset" element={<ChangePassword />} />

        <Route path="/unauthorize" element={<UnauthorizedPage />} />

        <Route path="/google" element={<Google />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="course/:id" element={<SIngleCourse />} />
          <Route path="profile" element={<UserProfilePage />} />

          

        </Route>
        <Route path="/" element={<RequireAuth isAllowed={["teacher"]} />}>
          <Route path="/teacherDashboard/" element={<TeacherDashboard />}>
            <Route path="" element={<HomeTeacherDashboard />} />
            <Route path="addCourse" element={<AddCourseForm />} />
            <Route path="getCourse" element={<CourseListTable />} />
            <Route path="getCourse/:id" element={<SingleCoursePage />} />
          </Route>
        </Route>
        <Route path="/" element={<RequireAuth isAllowed={["admin"]} />}>
          <Route path="/dashboard/" element={<Dashboard />}>
            <Route path="" element={<HomeDashboard />} />
            <Route path="addTeacher" element={<AddTeacherAdminForm />} />
            <Route path="teachers" element={<TeacherListTable />} />
            <Route
              path="updateTeacher/:id"
              element={<UpdateTeacherAdminForm />}
            />

            <Route path="addCategory" element={<AddCategory />} />
            <Route path="categories" element={<CategoryListTable />} />

            <Route path="courses" element={<CourseListTableAdmin />} />
            <Route path="addChapter" element={<AddChapter />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
