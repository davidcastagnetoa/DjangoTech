import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import { Home } from "./containers/home/Home.jsx";
import { Error404 } from "./containers/errors/Error404.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";

import Login from "./containers/auth/Login.jsx";
import SignUp from "./containers/auth/SignUp.jsx";
import Activate from "./containers/auth/Activate.jsx";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Error Page 404 */}
            <Route path="*" element={<Error404 />} />

            {/* Authentication Pages */}
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
