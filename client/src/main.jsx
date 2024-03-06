import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./store/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createElement = document.getElementById("root");
const root = createRoot(createElement);

root.render(
  <AuthProvider>
    <React.StrictMode>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Slide
        bodyClassName="toastBody"
      />
    </React.StrictMode>
  </AuthProvider>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     < App/>
//   </React.StrictMode>,
// )
