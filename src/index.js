import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { MantineProvider } from "@mantine/core";
import { Web3ContextProvider } from "./context/Web3Context";
import { ToastContainer } from "react-toastify";
import { Web3Button } from "./dashboard/UI/Web3Button";
import 'react-toastify/dist/ReactToastify.css'

export let socket = io("wss://pamogi-socket-server.herokuapp.com");
// export let socket = io("ws://localhost:9000");

socket.emit("connected", socket.id);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Web3ContextProvider>
        <Web3Button />
        <App />
        <ToastContainer
          hideProgressBar
          position="bottom-right"
          autoClose={2000}
          />
      </Web3ContextProvider>
    </MantineProvider>
  </React.StrictMode>
);
