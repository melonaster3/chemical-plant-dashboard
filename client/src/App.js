import logo from "./logo.svg";
import "./App.css";
import Graph from "./components/index";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Chemical Dashboard</h1>
        <Graph />
{/*         <img src={logo} className="App-logo" alt="logo" />
 */}        {/* <p>Lol</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a> */}
      </header>
    </div>
  );
}

export default App;
