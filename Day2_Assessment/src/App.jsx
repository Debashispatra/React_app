import Demo from "./Demo";
import Dashboard from "./Dashboard/Dashboard";
import UseState from "./UseState/Usestate";
import SearchBar from "./Eventhandling/EventHandling";
import SecretMessage from "./Conditionalrendering/SecretMessage";
import TodoList from "./List&key/TodoList";
import AutoFocusForm from "./Useref/AutoFocusForm";
function App() {
  return (
    <div>
      {/* <Demo /> */}
      <Dashboard />
      <UseState />
      <SearchBar />
      <SecretMessage />
      <TodoList />
      <AutoFocusForm />
    </div>
  );
}

export default App
