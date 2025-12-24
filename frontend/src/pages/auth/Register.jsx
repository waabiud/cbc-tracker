import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone } from "lucide-react";

import Navbar from "../../components/common/Navbar";
import InputField from "../../components/common/InputField";
import authService from "../../api/auth.service";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "TEACHER",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.register(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      navigate("/login");
    } catch {
      setError("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center py-10">
        <div className="bg-white p-8 rounded-xl shadow max-w-lg w-full">
          <div className="text-center mb-6">
            <UserPlus className="mx-auto h-10 w-10 text-blue-600" />
            <h2 className="text-2xl font-bold mt-2">Register</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField name="username" label="Full Name" onChange={handleChange} icon={<User />} />
            <InputField name="email" label="Email" onChange={handleChange} icon={<Mail />} />
            <InputField name="phone" label="Phone" onChange={handleChange} icon={<Phone />} />
            <InputField name="password" type="password" label="Password" onChange={handleChange} icon={<Lock />} />
            <InputField name="confirmPassword" type="password" label="Confirm Password" onChange={handleChange} icon={<Lock />} />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already registered?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
