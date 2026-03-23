import { useState } from "react";
import "./Auth.css";

export default function AuthModal({ close, defaultMode = "login", onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Fill all required fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setMessage("Invalid email");
      return;
    }

    if (isLogin) {
      const res = onLogin(form.email, form.password);

      if (res.success) {
        close();
      } else if (res.reason === "not_registered") {
        setMessage("User not registered. Please register!");
        setIsLogin(false); // switch to register
      } else if (res.reason === "wrong_password") {
        setMessage("Wrong password!");
      }
    } else {
      if (!form.name || !/^[A-Za-z\s]+$/.test(form.name)) {
        setMessage("Name should contain only letters");
        return;
      }
      if (!form.phone || !/^[0-9]{10}$/.test(form.phone)) {
        setMessage("Enter valid 10-digit phone number");
        return;
      }

      onRegister(form);
      setMessage("Registered successfully! Please login");
      setIsLogin(true);
      setForm({ name: "", email: form.email, password: "", phone: "" });
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {message && <p className="error-msg">{message}</p>}

        {!isLogin && (
          <>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </>
        )}

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "New user? Register" : "Already have account? Login"}
        </p>

        <span className="close" onClick={close}>✖</span>
      </div>
    </div>
  );
}