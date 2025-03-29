import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [teachers, setTeachers] = useState({});

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <header
      id="page-header"
      className="relative flex items-center flex-none py-5"
    >
      {/* Main Header Content */}
      <div className="container flex flex-col px-4 mx-auto space-y-4 text-center sm:flex-row sm:items-center sm:justify-between sm:space-y-0 lg:px-8 xl:max-w-7xl">
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-lg font-bold tracking-wide text-gray-900 group hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
          >
            <svg
              className="inline-block text-blue-600 transition hi-mini hi-cube-transparent size-5 group-hover:scale-110 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            <span>Edusphere</span>
          </Link>
        </div>
        <div>
          {localStorage.getItem("token") ? (
            <nav className="space-x-3 md:space-x-6 relative">
              <button
                onClick={toggleMenu}
                className="flex items-center text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400 focus:outline-none"
              >
                <img
                  src={
                    teachers.googlePhoto !== ""
                      ? teachers.googlePhoto
                      : baseUrl + "/" + teachers.photoUrl
                  }
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <svg
                  className="w-4 h-4 ml-1 transition-transform transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </Link>
                  <Link
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </nav>
          ) : (
            <nav className="space-x-3 md:space-x-6">
              <a
                href="/login"
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
              >
                <span>Login</span>
              </a>
              <a
                href="/register"
                className="text-sm font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
              >
                <span>Register</span>
              </a>
            </nav>
          )}
        </div>
      </div>
      {/* END Main Header Content */}
    </header>
  );
};

export default Navbar;
