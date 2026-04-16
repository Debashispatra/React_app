import Demo from "./demo";
import ButtonComponent from "./cssmodule/ButtonComponent";
import InlineStyle from "./InlineStyle";
// import StyledComponent from "./StyledComponent";
import Tailwindcss from "./Tailwindcss";  
import StatusCard from "./Statuscard/StatusCard";
import HeaderComponent from "./HeaderFooter.jsx/HeaderComponent";
import FooterComponent from "./HeaderFooter.jsx/FooterComponent";
import Navbar from "./Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
    {/* <Demo />
    <ButtonComponent></ButtonComponent>
    <InlineStyle></InlineStyle> */}
    {/* <StyledComponent></StyledComponent> */}
    {/* <Tailwindcss></Tailwindcss> */}

    {/* task Day3 */}
    <div>
      <button className = "btn">Click Me</button>

      <StatusCard type="success" message="Operation Successful!" />
      <StatusCard type="error" message="Something went wrong!" />
      <StatusCard message="Default state" />

      <HeaderComponent></HeaderComponent>
      <FooterComponent></FooterComponent>

      <Navbar></Navbar>
    </div>
    </>
  )
}

export default App;