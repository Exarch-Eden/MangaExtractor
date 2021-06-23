// third-party libraries
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

// components
import Routes from "./components/Routes";

// css
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes />
        </main>
        <footer>
          <p>Electron app created by Kent Claudio</p>
        </footer>
      </HashRouter>
    </div>
  );
};

export default App;
