import React, { use, useState, useEffect } from "react";
import userImg from "../../../assets/user.png";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";
import Loading from "../../../Components/Common/Loading/Loading";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

const MyProfile = () => {
  const { user, loading, updateUser, setUser } = use(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || "");
  const [companyName, setCompanyName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const googlePhotoURL = user?.providerData?.[0]?.photoURL || "";

  useEffect(() => {
    if (user?.email) {
      fetch(`${BASE_URL}/jobs?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) setCompanyName(data[0].company || "");
        })
        .catch(() => setCompanyName(""));
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setRemovePhoto(false); 

    const reader = new FileReader();
    reader.onloadend = () => setNewPhotoURL(reader.result);
    reader.readAsDataURL(file);
  };


  const handleRemovePhoto = () => {
    setRemovePhoto(true);
    setPhotoFile(null);
    setNewPhotoURL(""); 
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updateData = {};

    if (newName && newName !== user.displayName) {
      updateData.displayName = newName;
    }

    if (removePhoto) {
      updateData.photoURL = googlePhotoURL;
    }
    else if (photoFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", photoFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        updateData.photoURL = data.data.url;
      } catch {
        toast.error("Image upload failed.");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
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
        setPhotoFile(null);
        setRemovePhoto(false);
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update profile: " + error.message);
      });
  };

  if (loading) return <Loading />;
  if (!user) return <div>Please log in to view your profile.</div>;

  const displayName = user.displayName || "User Name Not Set";
  const email = user.email || "Email Not Available";
  const userImage = user.photoURL ? user.photoURL : userImg;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-lg mx-auto py-12 px-4">

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={userImage}
            alt={displayName}
            className="rounded-full shadow-xl w-32 h-32 object-cover border-4 border-white"
          />
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-extrabold text-gray-800">{displayName}</h1>
          <p className="text-sm text-gray-500">{email}</p>

          {companyName && (
            <p className="text-sm text-gray-500 font-medium">
              Company: <span className="font-bold text-gray-700">{companyName}</span>
            </p>
          )}

          <button
            onClick={() => setIsUpdating(!isUpdating)}
            className="mt-4 bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            {isUpdating ? "Close" : "Update Profile"}
          </button>

          {/* Update Form */}
          {isUpdating && (
            <div className="mt-6 w-full border-t pt-6">
              <h2 className="text-lg font-bold text-gray-700 mb-4 text-left">
                Update Profile
              </h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">

                {/* Name */}
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter new name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Photo Upload */}
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo
                  </label>

                  {/* Preview or removed state */}
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={removePhoto ? googlePhotoURL || userImg : newPhotoURL || userImg}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="flex flex-col gap-1">
                      {removePhoto ? (
                        <p className="text-xs text-green-600 font-medium">
                          Will revert to Google photo on save
                        </p>
                      ) : (
                        photoFile && (
                          <p className="text-xs text-green-600 font-medium">
                             New photo selected
                          </p>
                        )
                      )}
                      {/* Remove button */}
                      {!removePhoto && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="text-xs text-red-500 border border-red-400 rounded px-2 py-1 hover:bg-red-50 transition"
                        >
                          Remove Photo
                        </button>
                      )}
                      {/* Undo remove */}
                      {removePhoto && (
                        <button
                          type="button"
                          onClick={() => {
                            setRemovePhoto(false);
                            setNewPhotoURL(user?.photoURL || "");
                          }}
                          className="text-xs text-gray-500 border border-gray-400 rounded px-2 py-1 hover:bg-gray-50 transition"
                        >
                          Undo Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    disabled={uploading}
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:font-semibold hover:file:opacity-90 cursor-pointer disabled:opacity-50"
                  />
                  {uploading && (
                    <p className="text-xs text-primary mt-1 animate-pulse">
                      Uploading image...
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                  >
                    {uploading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUpdating(false);
                      setPhotoFile(null);
                      setRemovePhoto(false);
                      setNewPhotoURL(user?.photoURL || "");
                    }}
                    className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <Toaster/>
    </div>
  );
};

export default MyProfile;