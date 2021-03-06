import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Chat from "./components/chat/Chat";
import { AuthProvider } from "./provider/AuthProvider";

const ShowCase = React.lazy(() => import("./components/index/ShowCase"));
const Skill = React.lazy(() => import("./components/Skill"));
const Class = React.lazy(() => import("./components/class/Class"));
const Destiny = React.lazy(() => import("./components/destiny/Destiny"));
const Trait = React.lazy(() => import("./components/trait/Trait"));
const Quest = React.lazy(() => import("./components/Quest"));
const Guide = React.lazy(() => import("./components/guide/Guide"));
const Char = React.lazy(() => import("./components/character/Char"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Nav />
          <div className="app__body">
            <div className="app__content">
              <Switch>
                <React.Suspense fallback={<p>Loading</p>}>
                  <Route path="/" exact component={ShowCase} />
                  <Route path="/class" exact component={Class} />
                  <Route path="/skill" exact component={Skill} />
                  <Route path="/trait" exact component={Trait} />
                  <Route path="/destiny" exact component={Destiny} />
                  <Route path="/quest" exact component={Quest} />
                  <Route path="/build" exact component={Guide} />
                  <Route path="/char" exact component={Char} />
                </React.Suspense>
              </Switch>
            </div>
            <div className="app__chat">
              <Chat />
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
