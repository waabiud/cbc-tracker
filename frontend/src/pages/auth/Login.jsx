import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";

import Navbar from "../../components/common/Navbar";
import InputField from "../../components/common/InputField";
import { useUserContext } from "../../contexts/UserContext";
import authService from "../../api/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.login({ email, password });

      if (!result.success) {
        setError(result.error || "Invalid credentials");
        return;
      }

      const { token, user } = result.data;

      if (token) localStorage.setItem("token", token);
      setUser(user);

      // Teacher → dashboard
      navigate("/dashboard");
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center py-10">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
          <div className="text-center mb-6">
            <LogIn className="mx-auto h-10 w-10 text-blue-600" />
            <h2 className="text-2xl font-bold mt-2">Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail />}
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock />}
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            No account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
