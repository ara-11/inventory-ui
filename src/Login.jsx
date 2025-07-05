import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("https://inventory-api-ulj3.onrender.com/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ⚠️ Required for session cookies
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      onLogin(); // tells App we're logged in
    } else {
      setError("❌ Invalid username or password");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-xl mb-4 text-center font-bold">🔐 Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
