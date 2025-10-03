// client/src/components/AuthForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "./CTAButton";

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!form.email) return "Please enter an email.";
    if (!form.password || form.password.length < 6) return "Password must be at least 6 characters.";
    if (isRegister && form.password !== form.confirmPassword) return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const payload = isRegister
        ? { name: form.name, company: form.company, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Server error");

      // Example: store token & redirect. Adjust to your app's auth flow.
      if (data.token) localStorage.setItem("token", data.token);
      // Navigate to dashboard (change route as needed)
      navigate("/access-enterprise");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">{isRegister ? "Create an account" : "Welcome back"}</h2>
        <p className="text-sm text-gray-500 mb-6">{isRegister ? "Join us — create your enterprise account." : "Sign in to continue to your dashboard."}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <label className="block">
                <span className="text-sm font-medium">Full name</span>
                <input name="name" value={form.name} onChange={onChange} placeholder="Jane Doe" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-200" />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Company</span>
                <input name="company" value={form.company} onChange={onChange} placeholder="Your company name" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-200" />
              </label>
            </>
          )}

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input name="email" value={form.email} onChange={onChange} type="email" placeholder="you@example.com" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-200" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <div className="relative mt-1">
              <input
                name="password"
                value={form.password}
                onChange={onChange}
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {isRegister && (
            <label className="block">
              <span className="text-sm font-medium">Confirm password</span>
              <input name="confirmPassword" value={form.confirmPassword} onChange={onChange} type="password" placeholder="Confirm password" className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-200" />
            </label>
          )}

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="pt-2">
            <CTAButton type="submit" className="w-full">
              {loading ? (isRegister ? "Registering…" : "Signing in…") : isRegister ? "Create account" : "Sign in"}
            </CTAButton>
          </div>
        </form>

        {/* Optional small footer */}
        <div className="mt-4 text-sm text-center text-gray-500">
          {isRegister ? (
            <>Already have an account? <a href="/login" className="text-indigo-600 underline">Sign in</a></>
          ) : (
            <>Don't have an account? <a href="/register" className="text-indigo-600 underline">Create one</a></>
          )}
        </div>
      </div>
    </div>
  );
}
