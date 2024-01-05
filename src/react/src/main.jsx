import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById("root"));

// Mount your app using the new API
root.render(<App />);
