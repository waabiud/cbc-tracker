import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import EditProfileModal from "./EditProfileModal";
import ImgUpload from "./ImgUpload";
import Performance from "./Performance";
import profileService from "../../api/profile.service";
import { useUserContext } from "../../contexts/UserContext";

export default function Profile() {
  const { user } = useUserContext();
  const [profile, setProfile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const res = await profileService.getProfile();
      if (res?.success) setProfile(res.data);
    }
    loadProfile();
  }, []);

  if (!profile) return <p className="p-6">Loading profile...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center gap-6">
            <ImgUpload
              image={profile.avatar}
              onUpload={(img) =>
                setProfile((prev) => ({ ...prev, avatar: img }))
              }
            />

            <div>
              <h2 className="text-2xl font-bold">{profile.username}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-sm text-gray-500">{profile.role}</p>

              <button
                onClick={() => setShowEdit(true)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <Performance />
      </div>

      {showEdit && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => setProfile(updated)}
        />
      )}
    </>
  );
}
