import Greeting from "./components/Greeting";
import InteractiveGreeting from "./components/InteractiveGreeting";

function App() {
  return (
    <div>
      <h1>My First React App</h1>
      <Greeting firstname="Arockian" lastname="David" />
      <InteractiveGreeting />
    </div>
  )
}
export default App;