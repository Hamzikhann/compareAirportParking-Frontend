import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { getToken } from "../services/AuthService";
import { toast } from "react-toastify";

function EditProfile() {
  const { user, setUser } = useUserStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.user) {
      setFormData({
        firstName: user.user.firstName || "",
        lastName: user.user.lastName || "",
        email: user.user.email || "",
        phoneNo: user.user.phoneNo || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getToken();

      const response = await axios.post(
        "http://localhost:8000/api/users/update/profile",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
          },
        }
      );

      // ✅ Extract updated user from response
      const updatedData = response.data?.data;
      if (!updatedData) {
        throw new Error("Invalid response from server");
      }

      // ✅ Merge updated data into the existing user
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          ...updatedData, // backend returned new values
        },
      };

      // ✅ Update Zustand store
      setUser(updatedUser, token);

      // ✅ Update localStorage (Zustand persist uses localStorage)
      sessionStorage.setItem(
        "parking-user",
        JSON.stringify({
          user: updatedUser,
        })
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b4e172] focus:border-[#b4e172]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b4e172] focus:border-[#b4e172]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b4e172] focus:border-[#b4e172]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#b4e172] focus:border-[#b4e172]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#b4e172] text-[#1a475b] py-2 px-4 rounded-md hover:bg-[#a3d66a] disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
