import React, { use, useState } from "react";
import userImg from "../../../assets/user.png";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";
import Loading from "../../../Components/Common/Loading/Loading";

const MyProfile = () => {
  const { user, loading, updateUser, setUser } = use(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || "");

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updateData = {};
    if (newName && newName !== user.displayName) {
      updateData.displayName = newName;
    }
    if (newPhotoURL && newPhotoURL !== user.photoURL) {
      updateData.photoURL = newPhotoURL;
    }

    if (Object.keys(updateData).length === 0) {
      toast.success("No changes detected.");
      setIsUpdating(false);
      return;
    }

    updateUser(updateData)
      .then(() => {
        setUser({ ...user, ...updateData });
        setIsUpdating(false);
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        // console.error("Profile update error:", error);
        toast.error("Failed to update profile: " + error.message);
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  const displayName = user.displayName || "User Name Not Set";
  const email = user.email || "Email Not Available";
  const userImage = user.photoURL ? user.photoURL : userImg;

  return (
    <div className=" bg-base-200  min-h-screen">
      <section>
        <div className=" grid grid-cols-1 space-y-5 ">
          <div className="flex justify-center items-center m-5">
            <img
              src={userImage}
              alt={displayName}
              className="rounded-full shadow-2xlr w-50 h-50"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center">{displayName}</h1>
            <h3 className="text-xl font-bold ">Email: {email}</h3>

            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsUpdating(true)}
                className="btn btn-primary text-white "
              >
                Update your profile
              </button>
            </div>

            {isUpdating && (
              <div className="mt-8 p-6 bg-white shadow-lg rounded-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                  Update Profile
                </h2>
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text text-gray-700">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter new name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-gray-700">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter new photo URL"
                      value={newPhotoURL}
                      onChange={(e) => setNewPhotoURL(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button type="submit" className="btn btn-success text-white">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsUpdating(false)}
                      className="btn btn-ghost text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Toaster
        toastOptions={{
          success: {
            style: { background: "#22C55E", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#22C55E" },
          },
          error: {
            style: { background: "#EF4444", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#EF4444" },
          },
        }}
      />
    </div>
  );
};
export default MyProfile;
