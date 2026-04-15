export default function TodoList() {
  const todos = [
    "Learn React",
    "Practice JavaScript",
    "Build a Project",
    "Prepare for Interview"
  ];

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Todo List</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "10px"
            }}
          >
            {task}
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}