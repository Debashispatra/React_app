function UserControls({ user, handleChange }) {
  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      <h3>Change User Settings</h3>

      <label>
        Role:
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <br /><br />

      <label>
        Status:
        <select name="status" value={user.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </label>
    </div>
  );
}

export default UserControls;