import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/slices/authSlice";
import styles from "./Login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { status, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn(formData));
  };

  return (
    <div className={styles.loginContainer} aria-labelledby="login-heading">
      <section className={styles.loginCard}>
        <h1 id="login-heading" className={styles.title}>
          PostPulse
        </h1>
        <h2 className={styles.subtitle}>Login </h2>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your email"
              aria-required="true"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter your password"
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={status === "loading"}
            aria-busy={status === "loading"}
          >
            {status === "loading" ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.signupText}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className={styles.signupLink}
            aria-label="Go to sign up page"
          >
            Sign Up
          </button>
        </p>
      </section>
    </div>
  );
}
