import { useState } from "react";
import logo from "../assets/bank.png";
import watermark from "../assets/nsdl_watermark.png";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // success | error
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validation
    let newError = {};
    if (!form.username) newError.username = "Username is required";
    if (!form.password) newError.password = "Password is required";

    setError(newError);
    if (Object.keys(newError).length) return;

    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res) {
        // 🔹 Store data
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("user", JSON.stringify(res));

        // Success toast
        setToast({
          show: true,
          message: "User Login Successful!!",
          type: "success",
        });

        // 🔹 Redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        // Error toast
        setToast({
          show: true,
          message: "Invalid credentials",
          type: "error",
        });
      }
    } catch (err) {
      setToast({
        show: true,
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);

      // 🔹 Auto hide toast
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 2000);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* LEFT SIDE */}
        <div className="col-md-6 d-flex flex-column px-5 justify-content-center align-items-center">

          <img src={logo} alt="logo" style={{ width: "26rem" }} />

          <div
            className="mt-4 d-flex justify-content-center align-items-center bg-secondary bg-opacity-10 rounded"
            style={{ height: "350px" }}
          >
            <img
              src={watermark}
              alt="bg"
              style={{ width: "40%", opacity: 10 }}
            />
{/* //                     <div className="mt-4 d-flex justify-content-center align-items-center bg-secondary bg-opacity-10 rounded" style={{ height: "350px" }}>
//                         <img src={watermark} alt="bg" style={{ width: "40%", opacity: 10 }} />
//                     </div> */}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6 d-flex flex-column justify-content-center px-5">

          <h2 className="fw-bold">Welcome Back!</h2>
          <p className="text-muted">Please enter your details</p>

          <form onSubmit={handleSubmit} className="mt-3">

            {/* Username */}
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${error.username ? "is-invalid" : ""}`}
                placeholder="Username*"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
              {error.username && (
                <div className="invalid-feedback">{error.username}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <input
                type="password"
                className={`form-control ${error.password ? "is-invalid" : ""}`}
                placeholder="Password*"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
              {error.password && (
                <div className="invalid-feedback">{error.password}</div>
              )}
            </div>

            {/* Options */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <input type="checkbox" /> <label> Remember me</label>
              </div>
              <a href="#" className="text-decoration-none">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn text-white w-100 py-2"
              style={{ backgroundColor: "#8b0304" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>
        </div>
      </div>

      {/* Toast */}
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast text-white ${toast.show ? "show" : "hide"}`}
          style={{
            backgroundColor:
              toast.type === "success" ? "#28a745" : "#dc3545",
            minWidth: "260px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="toast-body">{toast.message}</div>
            <button
              className="btn-close btn-close-white me-2"
              onClick={() =>
                setToast((prev) => ({ ...prev, show: false }))
              }
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}