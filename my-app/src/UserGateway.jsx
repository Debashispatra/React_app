// UserGateway.jsx
import { useState } from "react";
import AdminPanel from "./AdminPanel";
import ContactSupport from "./ContactSupport";
import UserControls from "./UserControls";

function UserGateway() {
  const [user, setUser] = useState({
    name: "Alex",
    role: "user",
    status: "active",
  });

  // Handle dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Priority 1: Suspended
  if (user.status === "suspended") {
    return (
      <>
        <UserControls user={user} handleChange={handleChange} />
        <ContactSupport />
      </>
    );
  }

  // Priority 2: Admin
  if (user.role === "admin") {
    return (
      <>
        <UserControls user={user} handleChange={handleChange} />
        <AdminPanel />
      </>
    );
  }

  // Default UI
  return (
    <>
      <UserControls user={user} handleChange={handleChange} />
      <div style={{ padding: "20px" }}>
        <h2>Welcome, {user.name}</h2>
        <p>You have selected access.</p>
      </div>
    </>
  );
}

export default UserGateway;