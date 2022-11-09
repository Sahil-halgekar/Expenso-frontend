import { useState, useEffect } from "react";
import "./Profile.css";
import { getUserInfo } from "../../api/userInfo";
import { update } from "../../api/auth";
import { toast, Toaster } from "react-hot-toast";
function Profile() {
  let email = "";

  const [password, setPassword] = useState("");
  const handlePassword = (e) => setPassword(e.target.value);
  const [userInfo, setUserInfo] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    getData();
  }, []);
  email = userInfo?.email;
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    console.log(requestBody);
    const { success, errorMessage } = await update(requestBody);
    if (success === true) {
      toast.success("Password updated successfully");
    } else {
      toast.error(errorMessage);
    }
  };
  return (
    <>
      <div className="update-page">
        <div id="profileImage1">
          <p className="profileImg">
            {userInfo?.firstName.charAt(0) + userInfo?.lastName.charAt(0)}
          </p>
        </div>
        <form className="update-form" onSubmit={handleUpdateSubmit}>
          <h4>Email</h4>
          <div className="form-label-input">
            <input
              className="form-input"
              type="email"
              name="email"
              defaultValue={userInfo?.email}
              readOnly
            />
          </div>
          <h4>First Name</h4>
          <div className="form-label-input">
            <input
              className="form-input"
              type="text"
              name="firstName"
              defaultValue={userInfo?.firstName}
              readOnly
            />
          </div>
          <h4>Last Name</h4>
          <div className="form-label-input">
            <input
              className="form-input"
              type="text"
              name="lastName"
              defaultValue={userInfo?.lastName}
              readOnly
            />
          </div>
          <h4>Type new password to update password</h4>
          <div className="form-label-input">
            <input
              className="form-input"
              type="password"
              name="password"
              onChange={handlePassword}
              placeholder="New Password"
              required
            />
          </div>

          <button className="btn update-btn" type="submit">
            Update Profile
          </button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default Profile;
