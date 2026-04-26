import { useState, useEffect, useRef } from "react";
import {
    FaUserCircle,
    FaBell,
    FaChevronDown,
    FaSignOutAlt,
    FaUser,
    FaKey
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;

        if (path === "/dashboard") return "Dashboard";

        if (path.includes("create-cbc-user"))
            return "User Management /  Create CBC User";

        if (path.includes("/cbc-request"))
            return "User Management /  User Request";

        if (path.includes("users"))
            return "User Management /  User Request";

        if (path.includes("AuditTrial"))
            return "Audit Trail";

        if (path.includes("WalletAdjustment"))
            return "Wallet Adjustment";

        return "Dashboard";
    };

    return (
        <>
            {/* NAVBAR */}
            <div
                className="d-flex justify-content-between align-items-center px-4 shadow-sm"
                style={{
                    height: "64px",
                    backgroundColor: "#821317", // Primary red from ss
                    color: "#fff",
                    position: "sticky",
                    top: 0,
                    zIndex: 1020
                }}
            >
                <p className="mb-0 fw-bold fs-5">{getPageTitle()}</p>
                <div className="d-flex align-items-center gap-4 position-relative" ref={dropdownRef}>

                    {/* Notification Icon */}
                    <div className="position-relative" style={{ cursor: "pointer" }}>
                        <FaBell size={20} />
                        <span className="position-absolute top-0 start-100 translate-middle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </div>

                    {/* Profile Section */}
                    <div
                        className="d-flex align-items-center gap-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <FaUserCircle size={24} />
                        <span className="fw-semibold small">{user?.userType || "qa_ops_c"}</span>
                        <FaChevronDown size={12} className={`transition-all ${showDropdown ? 'rotate-180' : ''}`} />
                    </div>

                    {/* DROPDOWN MENU */}
                    {showDropdown && (
                        <div
                            className="bg-white text-dark shadow-lg rounded border"
                            style={{
                                position: "absolute",
                                top: "50px",
                                right: 0,
                                minWidth: "200px",
                                zIndex: 1050,
                                animation: "fadeIn 0.2s ease-out"
                            }}
                        >
                            <div
                                className="dropdown-item d-flex align-items-center gap-3 p-3 border-bottom text-secondary"
                                style={{ cursor: "pointer", transition: "background 0.2s" }}
                                onClick={() => {
                                    setShowDropdown(false);
                                    setShowProfileModal(true);
                                }}
                            >
                                <FaUser size={14} /> <span className="small fw-medium">Profile</span>
                            </div>

                            <div
                                className="dropdown-item d-flex align-items-center gap-3 p-3 border-bottom text-secondary"
                                style={{ cursor: "pointer", transition: "background 0.2s" }}
                                onClick={() => {
                                    setShowDropdown(false);
                                    setShowPasswordModal(true);
                                }}
                            >
                                <FaKey size={14} /> <span className="small fw-medium">Change Password</span>
                            </div>

                            <div
                                className="dropdown-item d-flex align-items-center gap-3 p-3 text-secondary"
                                style={{ cursor: "pointer", transition: "background 0.2s" }}
                                onClick={() => {
                                    setShowDropdown(false);
                                    setShowLogoutModal(true);
                                }}
                            >
                                <FaSignOutAlt size={14} /> <span className="small fw-medium">Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= PROFILE MODAL ================= */}
            {showProfileModal && (
                <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-4 border-0 shadow">

                            <h3 className="fw-semibold mb-2">User Profile</h3>
                            <p className="text-muted">View personal information</p>

                            <div className="mt-3">

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">Name</div>
                                    <div className="col-7">{user?.firstName} {user?.lastName}</div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">Phone No.</div>
                                    <div className="col-7">{user?.mobileNumber}</div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">Email ID</div>
                                    <div className="col-7">{user?.email}</div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">Address</div>
                                    <div className="col-7">Patia</div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">State</div>
                                    <div className="col-7">Odisha</div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">User ID</div>
                                    <div className="col-7">{user?.userType}</div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">Pan ID</div>
                                    <div className="col-7">EICPR6266H</div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-5 fw-semibold">User Type</div>
                                    <div className="col-7">{user?.roleName}</div>
                                </div>

                            </div>

                            <button
                                className="btn mt-3 text-white"
                                style={{ backgroundColor: "#8b0304" }}
                                onClick={() => setShowProfileModal(false)}
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* ================= CHANGE PASSWORD MODAL ================= */}
            {showPasswordModal && (
                <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content p-4 border-0 shadow text-center">

                            <h3 className="fw-semibold">Change Password</h3>
                            <p className="text-muted">Enter your old password and new password</p>

                            <input type="password" className="form-control my-2" placeholder="Old Password*" />
                            <input type="password" className="form-control my-2" placeholder="New Password*" />
                            <input type="password" className="form-control my-2" placeholder="Confirm Password*" />

                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <button
                                    className="btn"
                                    style={{ border: "1px solid #8b0304", color: "#8b0304" }}
                                    onClick={() => setShowPasswordModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn text-white"
                                    style={{ backgroundColor: "#8b0304" }}
                                >
                                    Verify OTP
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* ================= LOGOUT MODAL ================= */}
            {showLogoutModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", background: "rgba(0,0,0,0.4)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg text-center p-4">

                            <h5 className="fw-semibold mb-4">
                                Are you sure want to Logout?
                            </h5>

                            <div className="d-flex justify-content-center gap-4">
                                <button
                                    className="btn text-white px-4"
                                    style={{ backgroundColor: "#8b0304", borderRadius: "8px" }}
                                    onClick={handleLogout}
                                >
                                    YES
                                </button>

                                <button
                                    className="btn px-4"
                                    style={{
                                        border: "1px solid #8b0304",
                                        color: "#8b0304",
                                        borderRadius: "8px",
                                    }}
                                    onClick={() => setShowLogoutModal(false)}
                                >
                                    NO
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}