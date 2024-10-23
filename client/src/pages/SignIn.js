import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/slices/userSlice";
import { Toaster, toast } from "react-hot-toast";
import { postSignInForm } from "../services/services";
import "./signup.css";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
      const { data } = await postSignInForm(formData);
      dispatch(signInSuccess(data));
      toast.success("Successfully SignIn!");
      navigate("/");
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
      <h1 className="signup-title">Sign In</h1>
      <form onSubmit={handleSubmit} className="signup-form">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="signup-footer">
        <p>Do not have an account?</p>
        <a href="/sign-up" className="signup-link">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default SignIn;
