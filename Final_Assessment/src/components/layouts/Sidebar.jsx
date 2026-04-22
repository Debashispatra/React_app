import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/nsdl-logo.png";
import smallLogo from "../../assets/nsdl_icon_logo.png";
import {
    FaAngleLeft,
    FaAngleRight,
    FaLayerGroup,
    FaUsers,
    FaUserCheck,
    FaClipboardList,
    FaWallet
} from "react-icons/fa";

export default function Sidebar() {
    const location = useLocation();

    const isUserActive = location.pathname.includes("/users");

    const [openUserMenu, setOpenUserMenu] = useState(isUserActive);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (isUserActive) setOpenUserMenu(true);
    }, [isUserActive]);

    return (
        <div
            className="p-3"
            style={{
                width: collapsed ? "80px" : "21%",
                minHeight: "100vh",
                background: "#f5f4f4",
                transition: "0.3s",
                position: "relative"
            }}
        >
            {/* LOGO */}
            <img
                src={collapsed ? smallLogo : logo}
                alt="Logo"
                className="img-fluid"
                style={{
                    width: collapsed ? "40px" : "84%",
                    transition: "0.3s",
                }}
            />

            <ul className="nav flex-column mt-3">

                {/* 🔥 Dashboard with RIGHT EDGE Toggle */}
                <li className="nav-item mb-2 position-relative">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${
                                isActive ? "fw-bold text-white rounded" : "text-black"
                            }`
                        }
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? "#8b0304" : "transparent",
                            justifyContent: collapsed ? "center" : "flex-start",
                            paddingRight: "35px", // space for toggle
                        })}
                    >
                        <FaLayerGroup />
                        {!collapsed && <span className="ms-2">Dashboard</span>}
                    </NavLink>

                    {/* TOGGLE BUTTON (RIGHT EDGE) */}
                    <div
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            padding: "4px",
                        }}
                    >
                        {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
                    </div>
                </li>

                {/* User Management */}
                <li className="nav-item mb-2">
                    <div
                        className="nav-link d-flex align-items-center"
                        style={{
                            cursor: "pointer",
                            color: isUserActive ? "#8b0304" : "black",
                            fontWeight: isUserActive ? "600" : "normal",
                            justifyContent: collapsed ? "center" : "flex-start",
                        }}
                        onClick={() => !collapsed && setOpenUserMenu(!openUserMenu)}
                    >
                        <FaUsers />
                        {!collapsed && <span className="ms-2">User Management</span>}
                    </div>

                    {!collapsed && openUserMenu && (
                        <ul className="nav flex-column ms-3">
                            <li className="nav-item mb-1">
                                <NavLink
                                    to="/users"
                                    className={({ isActive }) =>
                                        `nav-link d-flex align-items-center ${
                                            isActive ? "fw-bold text-white rounded" : "text-black"
                                        }`
                                    }
                                    style={({ isActive }) => ({
                                        backgroundColor: isActive ? "#8b0304" : "transparent",
                                        padding: "10px",
                                        marginTop: "10px",
                                    })}
                                >
                                    <FaUserCheck className="me-2" />
                                    User Request
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Audit Trial */}
                <li className="nav-item mb-2">
                    <NavLink
                        to="/AuditTrial"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${
                                isActive ? "fw-bold text-white rounded" : "text-black"
                            }`
                        }
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? "#8b0304" : "transparent",
                            justifyContent: collapsed ? "center" : "flex-start",
                        })}
                    >
                        <FaClipboardList />
                        {!collapsed && <span className="ms-2">Audit Trial</span>}
                    </NavLink>
                </li>

                {/* Wallet Adjustment */}
                <li className="nav-item mb-2">
                    <NavLink
                        to="/WalletAdjustment"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${
                                isActive ? "fw-bold text-white rounded" : "text-black"
                            }`
                        }
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? "#8b0304" : "transparent",
                            justifyContent: collapsed ? "center" : "flex-start",
                        })}
                    >
                        <FaWallet />
                        {!collapsed && <span className="ms-2">Wallet Adjustment</span>}
                    </NavLink>
                </li>

            </ul>
        </div>
    );
}