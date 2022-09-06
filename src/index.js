import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/main.css";
import { fetchPosts } from "./redux/slices/postsSlice";
import { fetchUsers } from "./redux/slices/usersSlice";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
