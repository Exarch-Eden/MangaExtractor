// third-party libraries
import { HashRouter } from "react-router-dom";
import NavBar from "./components/Navbar";

// components
import Routes from "./components/Routes";

// css
import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <header className="headerContainer">
          <NavBar />
        </header>
        <main className="mainContainer">
          <Routes />
        </main>
        <footer className="footerContainer verticalPadding">
          <p>Electron app created by Kent Claudio</p>
        </footer>
      </HashRouter>
    </div>
  );
};

export default App;
