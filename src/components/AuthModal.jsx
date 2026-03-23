import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

export default function AuthModal({ close, defaultMode = "login" }) {
  const { register, login } = useContext(AuthContext);

  // ✅ CONTROL MODE FROM OUTSIDE
  const [isLogin, setIsLogin] = useState(defaultMode === "login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""   // ✅ PHONE ADDED
  });

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      return alert("Fill all fields");
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return alert("Invalid email");
    }

    if (isLogin) {
      login(form.email, form.password);
      close();
    } else {
      // ✅ NAME VALIDATION
      if (!form.name || !/^[A-Za-z\s]+$/.test(form.name)) {
        return alert("Name should contain only letters");
      }

      // ✅ PHONE VALIDATION
      if (!/^[0-9]{10}$/.test(form.phone)) {
        return alert("Enter valid 10 digit phone number");
      }

      register(form);

      // ✅ After register → switch to login
      setIsLogin(true);

      alert("Registered successfully! Please login");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {/* ✅ REGISTER FIELDS */}
        {!isLogin && (
          <>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {/* ✅ PHONE INPUT */}
            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </>
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "New user? Register"
            : "Already have account? Login"}
        </p>

        <span className="close" onClick={close}>✖</span>
      </div>
    </div>
  );
}