import UserProfile from "./UserProfile";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <UserProfile username="Debasish" age={25} isAdmin={true} />
      <UserProfile username="Ravi" age={30} isAdmin={false} />
      <UserProfile username="Anita" age={28} isAdmin={true} />

    </div>
  );
}

export default Dashboard;