import Sidebar from "./sidebar"
import MainContent from "./mainContent";
import StatusFooter from "./statusFooter";

function Dashboard() {
     return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <MainContent />
      </div>
      <StatusFooter />
    </div>
  );
}

export default Dashboard