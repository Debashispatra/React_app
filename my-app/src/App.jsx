import Dashboard from "./dashboard";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Button from "./components/common/Button";
import Input from "./components/common/Input";
import UserGateway from "./UserGateway";
import Currentyear from "./Currentyear";

function App() {
  return <div>
    <h2>1</h2>
    <h3>My Dashboard</h3>
    <Dashboard></Dashboard>
    <br />
    <h2>2</h2>
    <Navbar />

    <div style={{ padding: "20px" }}>
      <h1>Welcome</h1>
      <Input placeholder="Enter your name" />
      <br /><br />
      <Button label="Click Me" onClick={() => alert("Clicked!")} />
    </div>

    <Footer />
    <br />
    <h2>3</h2>
    <UserGateway />
    <h2>4</h2>
    <Currentyear></Currentyear>
  </div>



}

export default App