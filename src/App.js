import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Nav from "./components/nav/Nav";
import Chat from "./components/chat/Chat";
import { AuthProvider } from "./provider/AuthProvider";
import { motion } from "framer-motion";

const ShowCase = React.lazy(() => import("./components/videos/ShowCase"));
// const Skill = React.lazy(() => import("./components/Skill"));
const Class = React.lazy(() => import("./components/class/Class"));
const Destiny = React.lazy(() => import("./components/destiny/Destiny"));
const Trait = React.lazy(() => import("./components/trait/Trait"));
const Quest = React.lazy(() => import("./components/Quest"));
const Guide = React.lazy(() => import("./components/guide/Guide"));
const Char = React.lazy(() => import("./components/character/Char"));
const HomePage = React.lazy(() => import("./components/index/HomePage"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Nav />
          <div className="app__body">
            <motion.div
              className="app__content"
              initial={{ x: "-100vh" }}
              animate={{ x: 0 }}
            >
              <Switch>
                <React.Suspense fallback={<p>Loading</p>}>
                  <Route path="/videos" exact component={ShowCase} />
                  <Route path="/" exact component={HomePage} />
                  <Route path="/class" exact component={Class} />
                  {/* <Route path="/skill" exact component={Skill} /> */}
                  <Route path="/trait" exact component={Trait} />
                  <Route path="/destiny" exact component={Destiny} />
                  <Route path="/quest" exact component={Quest} />
                  <Route path="/guide" exact component={Guide} />
                  <Route path="/char" exact component={Char} />
                </React.Suspense>
              </Switch>
            </motion.div>
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
