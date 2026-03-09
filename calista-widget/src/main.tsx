import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

const mountNode =
  document.getElementById("calista-chat-root") ||
  document.getElementById("root")

if (mountNode) {
  ReactDOM.createRoot(mountNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}