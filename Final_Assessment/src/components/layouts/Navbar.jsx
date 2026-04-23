import { useState } from "react";
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

    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

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
                className="d-flex justify-content-between align-items-center px-4"
                style={{
                    height: "60px",
                    backgroundColor: "#8b0304",
                    color: "#fff",
                }}
            >
                <p className="mb-0 fw-semibold">{getPageTitle()}</p>
                <div className="d-flex align-items-center gap-4 position-relative">

                    {/* Notification */}
                    <FaBell size={20} style={{ cursor: "pointer" }} />

                    {/* Profile */}
                    <div
                        className="d-flex align-items-center gap-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <FaUserCircle size={22} />
                        <span className="fw-semibold">{user?.userType}</span>

                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: "28px",
                                height: "28px",
                                background: "white",
                                borderRadius: "50%",
                                color: "#8b0304",
                            }}
                        >
                            <FaChevronDown size={12} />
                        </div>
                    </div>

                    {/* DROPDOWN */}
                    {showDropdown && (
                        <div
                            className="bg-white text-dark shadow rounded"
                            style={{
                                position: "absolute",
                                top: "55px",
                                right: 0,
                                minWidth: "220px",
                                zIndex: 1000,
                            }}
                        >
                            {/* Profile */}
                            <div
                                className="dropdown-item d-flex align-items-center gap-2 p-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setShowDropdown(false);
                                    setShowProfileModal(true);
                                }}
                            >
                                <FaUser /> Profile
                            </div>

                            <hr className="m-0" />

                            {/* Change Password */}
                            <div
                                className="dropdown-item d-flex align-items-center gap-2 p-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setShowDropdown(false);
                                    setShowPasswordModal(true);
                                }}
                            >
                                <FaKey /> Change Password
                            </div>

                            <hr className="m-0" />

                            {/* Logout */}
                            <div
                                className="dropdown-item d-flex align-items-center gap-2 p-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setShowDropdown(false);
                                    setShowLogoutModal(true);
                                }}
                            >
                                <FaSignOutAlt /> Logout
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