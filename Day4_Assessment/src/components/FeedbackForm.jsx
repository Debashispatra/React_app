import { useState } from "react";
import { submitFeedback } from "../actions/feedback";

export default function FeedbackForm({ onAdd }) {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    const formData = new FormData(e.target);
    const res = await submitFeedback(formData);

    if (res.success) {
      setStatus(<h3 style={{color: "#0dcf1a"}}>Thank you for your feedback !</h3>);
      console.log("Feedback submitted!");
      onAdd(res.data);
      e.target.reset();
    } else {
      setStatus("Error submitting feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Give Feedback</h2>

      <input name="name" placeholder="Your Name" required />
      <br /><br />

      <textarea name="message" placeholder="Your Feedback" required />
      <br /><br />

      <select name="rating" required>
        <option value="">Select Rating</option>
        <option value="⭐">1 ⭐</option>
        <option value="⭐⭐">2 ⭐</option>
        <option value="⭐⭐⭐">3 ⭐</option>
        <option value="⭐⭐⭐⭐">4 ⭐</option>
        <option value="⭐⭐⭐⭐⭐">5 ⭐</option>
      </select>

      <br /><br />

      <button type="submit">Submit</button>

      <p>{status}</p>
    </form>
  );
}