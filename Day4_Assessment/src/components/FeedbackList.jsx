export default function FeedbackList({ feedbacks }) {
  return (
    <div>
      <h2>Feedback List</h2>

      {feedbacks.length === 0 ? (
        <p>No feedback yet</p>
      ) : (
        feedbacks.map((fb) => (
          <div
            key={fb.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <p><strong>Name: {fb.name}</strong></p>
            <p>Message: {fb.message}</p>
            <p>Rating: {fb.rating}</p>
          </div>
        ))
      )}
    </div>
  );
}