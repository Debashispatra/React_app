import { useState } from "react";
function UserProfile({ username, age, isAdmin = false }) {
  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {username}</p>
      <p><strong>Age:</strong> {age}</p>
      <p>
        <strong>Role:</strong> {isAdmin ? "Admin" : "User"}
      </p>
    </div>
  );
}
function LightSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggleLight = () => {
    setIsOn(prev => !prev);
  };

  return (
    <div style={{
        backgroundColor: isOn ? "yellow" : "gray",
        padding: "20px",
        marginTop: "20px",
        textAlign: "center"
      }}>
      <button onClick={toggleLight}>
        {isOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}

function LiveInput() {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Live Input</h2>

      <input
        type="text"
        placeholder="Type something..."
        onChange={handleChange}
      />

      <p>You typed: {text}</p>
    </div>
  );
}

function IfElse({ isLoggedIn }) {
  let button;

  if (isLoggedIn) {
    button = <button>Logout</button>;
  } else {
    button = null;
  }

  return <div>{button}</div>;
}

export default function Demo() {
    return (
        <>
        <UserProfile username="Debasish" age={25} />
        <LightSwitch />
        <LiveInput />
        <IfElse isLoggedIn={true} />
        </>
    )
}
