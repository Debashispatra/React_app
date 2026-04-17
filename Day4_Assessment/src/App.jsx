// import Demo from './Democomponent/demo.jsx'
// import MultiInput from './Democomponent/MultiInput.jsx';
import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const addFeedback = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h1>Feedback App</h1>

      <FeedbackForm onAdd={addFeedback} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default App;