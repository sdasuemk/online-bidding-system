import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { postSignupForm } from "../services/services";
import "./signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postSignupForm(formData);
      toast.success("Successfully Created!");
      navigate('/sign-in');
    } catch (err) {
      console.log(err.response?.data?.message || "Error occurred");
      toast.error(
        `Failed! ${err.response?.data?.message || "Something went wrong"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Toaster position="top-center" reverseOrder />
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="First Name"
          className="signup-input"
          id="firstName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="signup-input"
          id="lastName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          className="signup-input"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className={`signup-button ${loading ? "loading" : ""}`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="signup-footer">
        <p>Have an account?</p>
        <a href="/sign-in" className="signup-link">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default SignUp;
