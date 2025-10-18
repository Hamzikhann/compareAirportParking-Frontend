import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Input from "../components/Input";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import ApiService from "../services/ApiServices";
import { toast } from "react-toastify";
import useUserStore from "../store/userStore";
import { setToken, setUserId, setSessionUser } from "../services/AuthService";

function SignUp({ open, onClose, onOpenLogin }) {
  const titleOptions = [
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
    { label: "Dr", value: "Dr" },
  ];

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const handleRegister = async () => {
    if (!title || !firstName || !email || !phone || !password || !confirmPass) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (password !== confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        firstName,
        lastName,
        email,
        phoneNo: phone,
        password,
        confirmPassword: confirmPass,
      };

      const response = await ApiService.postRequest({
        path: "auth/signup",
        payload,
      });

      if (response?.data?.token) {
        const { token, data } = response.data;
        const user = data || response.data.user;
        setUser(user, token);
        setToken(token);
        setUserId(user?._id || user?.id);
        setSessionUser(user);

        toast.success("Account created successfully!");
        onClose();
      } else {
        toast.error(response?.data?.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error?.response?.data?.message || "Signup failed. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="signup-modal"
      sx={{
        backdropFilter: "blur(2px)",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 450,
          bgcolor: "white",
          borderRadius: 2,
          p: 3,
          position: "relative",
          boxShadow: 24,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#333",
          }}
        >
          <IoClose size={24} />
        </IconButton>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Sign Up</h1>

          <div>
            <label className="text-base font-normal text-gray-900">
              Title <span className="text-base text-red-500">*</span>
            </label>
            <Dropdown
              options={titleOptions}
              placeholder="Select Title"
              width="w-full"
              rounded="rounded-md"
              padding="py-3 px-3"
              onChange={(val) => setTitle(val)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-base font-normal text-gray-900">
                First Name <span className="text-base text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                rounded="rounded-md"
                width="w-full"
                padding="py-3 px-3"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-base font-normal text-gray-900">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                rounded="rounded-md"
                width="w-full"
                padding="py-3 px-3"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-base font-normal text-gray-900">
                Email <span className="text-base text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                rounded="rounded-md"
                width="w-full"
                padding="py-3 px-3"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-base font-normal text-gray-900">
                Phone No <span className="text-base text-red-500">*</span>
              </label>
              <Input
                type="tel"
                placeholder="Enter number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                rounded="rounded-md"
                width="w-full"
                padding="py-3 px-3"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-normal text-gray-900">
              Password <span className="text-base text-red-500">*</span>
            </label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rounded="rounded-md"
              width="w-full"
              padding="py-3 px-3"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base font-normal text-gray-900">
              Confirm Password <span className="text-base text-red-500">*</span>
            </label>
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              rounded="rounded-md"
              width="w-full"
              padding="py-3 px-3"
            />
          </div>

          <Button
            text={loading ? "Registering..." : "Register"}
            bg="bg-[#b4e172]"
            borderColor="border-[#b4e172]"
            textColor="text-[#1a475b]"
            width="w-full"
            textSize="text-lg"
            padding="py-3"
            onClick={handleRegister}
            disabled={loading}
          />

          <p className="text-center text-sm text-gray-700">
            Already have an account?{" "}
            <span
              onClick={onOpenLogin}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign In Here
            </span>
          </p>
        </div>
      </Box>
    </Modal>
  );
}

export default SignUp;
