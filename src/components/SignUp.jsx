import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("User registered successfully!");
        setEmail("");
        setPassword("");
        setRole("user");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
        {message && (
          <p className="text-center mb-4 text-sm text-red-500">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account? <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
