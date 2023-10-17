import logo from "./logo.svg";
import "./App.css";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Graph />
        <img src={logo} className="App-logo" alt="logo" />
        <p>Lol</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header>
    </div>
  );
}

export default App;
