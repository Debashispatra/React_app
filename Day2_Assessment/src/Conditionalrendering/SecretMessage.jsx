import { useState } from "react";

export default function SecretMessage() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Secret Message</h2>

      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        Show Secret
      </label>

      {isChecked && (
        <p style={{ marginTop: "20px", color: "green" }}>
            This is a secret message!
        </p>
      )}
    </div>
  );
}