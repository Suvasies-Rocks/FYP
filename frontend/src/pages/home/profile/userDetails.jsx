import ProfileUpdateModal from "./updateModal";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../config";
const UserDetails = ({ teachers, getAllData }) => {
  const updateProfile = async (e, data) => {
    const s = new FormData(e.target);
    let formData = {
      ...data,
      photoUrl: s.get("photoUrl"),
    };
    const response = await axios.patch(
      baseUrl + "/user/update-profile/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 200) {
      toast("success", response.data.message);
      getAllData();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <img
        src={
          teachers.googlePhoto !== ""
            ? teachers.googlePhoto
            : baseUrl + "/" + teachers.photoUrl
        }
        alt="User"
        className="w-24 h-24 rounded-full"
      />
      <div>
        <h2 className="text-xl font-semibold">
          {teachers?.user?.firstName} {teachers?.user?.lastName}
        </h2>
        <p className="text-gray-600">{teachers?.user?.email}</p>
      </div>
      <ProfileUpdateModal userDetails={teachers} onUpdate={updateProfile} />
    </div>
  );
};

export default UserDetails;
