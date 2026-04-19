import { use } from "react";

const usersPromise = fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json());

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px"
  },

  card: {
    width: "260px",
    backgroundColor: "#d9d9d9",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px"
  },

  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  name: {
    marginBottom: "10px",
    color: "#090909",
    fontWeight: "bold"
  },

  h5: {
    color: "#3f3d3d"
  }
};


function UserGallery() {
  const users = use(usersPromise);

  return (
    <div style={styles.container}>
      {users.map(user => (
        <div key={user.id} style={styles.card}>
          
          {/* Avatar */}
          <div style={styles.avatarWrapper}>
            <img
              src={`https://i.pravatar.cc/150?img=${user.id}`}
              alt="avatar"
              style={styles.avatar}
            />
          </div>

          {/* User Info */}
          <h4 style={styles.name}>Name: {user.name}</h4>
          <h5 style={styles.h5}><strong>Job Title:</strong> {user.company.bs}</h5>
          <h5 style={styles.h5}><strong>Department:</strong> {user.company.name}</h5>
          <h5 style={styles.h5}><strong>Office Phone:</strong> {user.phone}</h5>
          <h5 style={styles.h5}><strong>Mobile:</strong> {user.phone}</h5>
          <h5 style={styles.h5}><strong>Email:</strong> {user.email}</h5>

        </div>
      ))}
    </div>
  );
}

export default UserGallery;