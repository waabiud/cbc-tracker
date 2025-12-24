import profileService from "../../api/profile.service";

export default function ImgUpload({ image, onUpload }) {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const res = await profileService.uploadProfileImage(file);
    if (res?.success) {
      onUpload(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative">
      <img
        src={image || "/assets/images/user.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  );
}
