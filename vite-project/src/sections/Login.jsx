import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Input from "../components/Input";
import Button from "../components/Button";
import ApiService from "../services/ApiServices";
import { toast } from "react-toastify";
import useUserStore from "../store/userStore";
import { setToken, setUserId, setSessionUser } from "../services/AuthService";

function Login({ open, onClose, onOpenSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiService.postRequest({
        path: "auth/login",
        payload: { email, password },
      });

      if (response?.data?.token) {
        const { token, data } = response.data;
        const user = data || response.data.user;
        setUser(user, token);
        setToken(token);
        setUserId(user?._id || user?.id);
        setSessionUser(user);
        // console.log("Login response:", response.data);

        toast.success("Login successful!");
        onClose();
      } else {
        toast.error(response?.data?.message || "Invalid credentials!");
      }
    } catch (error) {
      toast.error("Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal"
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
          width: 430,
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

        <div className="flex flex-col gap-3 px-1">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Sign In</h1>

          <div className="flex flex-col gap-1">
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

          <div className="text-end">
            <p className="text-blue-600 text-base hover:underline cursor-pointer">
              Forgot Your Password?
            </p>
          </div>

          <Button
            text={loading ? "Signing In..." : "Sign In"}
            bg="bg-[#b4e172]"
            borderColor="border-[#b4e172]"
            textColor="text-[#1a475b]"
            width="w-full"
            textSize="text-lg"
            padding="py-3"
            onClick={handleLogin}
            disabled={loading}
          />

          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <span
              onClick={onOpenSignup}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </Box>
    </Modal>
  );
}

export default Login;
