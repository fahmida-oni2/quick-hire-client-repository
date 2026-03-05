import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const { createUser, setUser, updateUser, signInWihGoogle } = use(AuthContext);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.data.url;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regExp.test(password)) {
      toast.error("Password must be 6+ characters with uppercase and lowercase.");
      return;
    }

    try {
      let photoURL = "";
      if (photoFile) {
        toast.loading("Uploading photo...");
        photoURL = await uploadPhoto(photoFile);
        toast.dismiss();
      }

      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL });
      setUser({ ...user, displayName: name, photoURL });
      toast.success("Account created! Welcome to QuickHire.");
      navigate("/");
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = () => {
    signInWihGoogle()
      .then(() => {
        toast.success("Signed in with Google!");
        navigate("/");
      })
      .catch(() => toast.error("Google Sign-In failed"));
  };

  return (
    <div className="min-h-screen bg-white font-epilogue flex flex-col">

      {/* Top Nav */}
      <div className="px-6 md:px-20 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          <FaArrowLeft size={12} />
          Back to Home
        </Link>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-redhat text-2xl font-bold text-dark mb-1">
              Create account
            </h2>
            <p className="text-sm text-gray-400">
              Join QuickHire and find your dream job.
            </p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2.5 py-3 border border-gray-200 rounded-lg text-sm font-medium text-dark hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-gray-100"></span>
            <span className="text-xs text-gray-300 uppercase tracking-widest">or</span>
            <span className="flex-1 h-px bg-gray-100"></span>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Photo Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-dark">
                Profile Photo <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-gray-300 text-xs">Photo</span>
                  )}
                </div>
                <label className="flex-1 flex items-center gap-2 px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-gray-400 text-sm">
                    {photoFile ? photoFile.name : "Choose from device"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-dark">Full Name</label>
              <input
                name="name"
                type="text"
                className="w-full px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-dark">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-dark">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="w-full px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary focus:bg-white transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {show ? <FaEye size={15} /> : <IoEyeOff size={15} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Min 6 characters with uppercase and lowercase.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity mt-1 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Register;
