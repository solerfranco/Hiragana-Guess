import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyCnMEu2jFT4maa2c0wQhJcTWSCVsvauWRU",
  authDomain: "hiragana-guess.firebaseapp.com",
  projectId: "hiragana-guess",
  storageBucket: "hiragana-guess.appspot.com",
  messagingSenderId: "251511329463",
  appId: "1:251511329463:web:06d130066d684fc9ef7332",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </FirebaseAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
