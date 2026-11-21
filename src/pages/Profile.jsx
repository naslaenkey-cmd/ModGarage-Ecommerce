
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { logout } from "../redux/slices/authSlice";

function Profile() {

  const userId = useSelector((state) => state.auth.user?.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Get logged in user details
  useEffect(() => {

    const getUser = async () => {

      try {

        const response = await api.get(`/users/${userId}`);

        setUser(response.data);

        setFullName(response.data.fullName);
        setEmail(response.data.email);
        setPassword(response.data.password);

      } catch (error) {

        setMessage("Unable to load profile");

      } finally {

        setLoading(false);

      }

    };

    if (userId) {
      getUser();
    }

  }, [userId]);

  // Enable editing
  const handleEdit = () => {
    setIsEditing(true);
    setMessage("");
  };

  // Update user details
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const updatedUser = {
        ...user,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      };

      const response = await api.put(
        `/users/${userId}`,
        updatedUser
      );

      setUser(response.data);

      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setPassword(response.data.password);

      setIsEditing(false);

      setMessage("Profile updated successfully");

    } catch (error) {

      setMessage("Profile update failed");

    }

  };

  // Cancel editing
  const handleCancel = () => {

    setFullName(user.fullName);
    setEmail(user.email);
    setPassword(user.password);

    setIsEditing(false);
    setMessage("");

  };

  // Logout user
  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center">
        <p className="text-[#D6B36A] text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center">
        <p className="text-red-400">User not found</p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#0B0F14] px-4 py-16">

      <div className="max-w-2xl mx-auto">

        <div className="bg-[#11161D] border border-[#30343B] rounded-xl p-6 md:p-10">

          <div className="mb-8">

            <p className="text-[#D6B36A] text-sm tracking-[3px] uppercase mb-2">
              Account Settings
            </p>

            <h1 className="text-3xl font-bold text-[#F5F5F4]">
              My Profile
            </h1>

            <p className="text-[#A3AAB5] mt-2">
              Manage your personal account details.
            </p>

          </div>

          <form onSubmit={handleUpdate}>

            <div className="mb-5">

              <label className="block text-[#F5F5F4] mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                readOnly={!isEditing}
                required
                className={`w-full bg-[#171C23] border border-[#30343B] rounded-lg px-4 py-3 text-white outline-none ${
                  isEditing ? "focus:border-[#D6B36A]" : "cursor-not-allowed opacity-75"
                }`}
              />

            </div>

            <div className="mb-5">

              <label className="block text-[#F5F5F4] mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditing}
                required
                className={`w-full bg-[#171C23] border border-[#30343B] rounded-lg px-4 py-3 text-white outline-none ${
                  isEditing ? "focus:border-[#D6B36A]" : "cursor-not-allowed opacity-75"
                }`}
              />

            </div>

            <div className="mb-8">

              <label className="block text-[#F5F5F4] mb-2">
                Password
              </label>

              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                readOnly={!isEditing}
                required
                className={`w-full bg-[#171C23] border border-[#30343B] rounded-lg px-4 py-3 text-white outline-none ${
                  isEditing ? "focus:border-[#D6B36A]" : "cursor-not-allowed opacity-75"
                }`}
              />

            </div>

            {!isEditing ? (

              <button
                type="button"
                onClick={handleEdit}
                className="w-full bg-[#D6B36A] text-[#0B0F14] font-semibold py-3 rounded-lg hover:bg-[#E8C982] transition duration-300"
              >
                Edit Profile
              </button>

            ) : (

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 bg-[#D6B36A] text-[#0B0F14] font-semibold py-3 rounded-lg hover:bg-[#E8C982] transition duration-300"
                >
                  Update Profile
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border border-[#30343B] text-white font-semibold py-3 rounded-lg hover:bg-[#171C23] transition duration-300"
                >
                  Cancel
                </button>

              </div>

            )}

          </form>

          {message && (
            <p className="text-center text-sm text-[#D6B36A] mt-5">
              {message}
            </p>
          )}

          <div className="border-t border-[#30343B] mt-8 pt-6">

            <h2 className="text-white font-semibold mb-2">
              Account Logout
            </h2>

            <p className="text-[#A3AAB5] text-sm mb-4">
              Logout from your ModGarage account.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full border border-red-500 text-red-400 font-semibold py-3 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;
