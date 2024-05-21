import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="text-blue-600">app</div>
    </Provider>
  );
}

export default App;
