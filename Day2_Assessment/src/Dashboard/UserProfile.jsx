function UserProfile({ username, age, isAdmin = false }) {
  let role;
  if (isAdmin) {
    role = "Admin";
  } else {
    role = "User";
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {username}</p>
      <p><strong>Age:</strong> {age}</p>
      <p>
        <strong>Role:</strong> {role} </p>
      {/* {isAdmin ? "Admin" : "User"} */}

    </div>
  );
}

export default UserProfile;