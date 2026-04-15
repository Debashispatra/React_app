import { useEffect, useRef } from "react";

export default function AutoFocusForm() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Auto Focus Form</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your name"
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter your email"
      />
    </div>
  );
}