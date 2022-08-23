import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import NavBar from "./components/NavBar/NavBar";
import WelcomeAllPage from "./pages/Welcome/WelcomeAllPage";
import LoginPage from "./pages/Login/LoginPage";
import LogoutPage from "./pages/Logout/LogoutPage";
import RegisterPage from "./pages/Register/RegisterPage";
import MyBooks from "./pages/MyBooks/MyBooks";
import FindBooks from "./pages/FindBooks/FindBooks";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // I made use of this variable in order to know when someone is logged in or not.
  const [client, setClient] = useState({}); // This variable is used to hold the user that logged in.
  return (
    //The router is needed in order to move from a page to another
    <Router>
      <NavBar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        client={client}
        setClient={setClient}
      />{/* This NavBar will be shown in every page */}
      <Routes>
        <Route
          path="/"
          element={
            <WelcomeAllPage
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              client={client}
              setClient={setClient}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              client={client}
              setClient={setClient}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <LogoutPage
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              client={client}
              setClient={setClient}
            />
          }
        />
        <Route
        path="/register"
        element={
          <RegisterPage
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          client={client}
          setClient={setClient}
        />
        }
        />
        <Route
        path="/client/myBooks"
        element={
          <MyBooks
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          client={client}
          setClient={setClient}
          />
        }
        />
        <Route
        path="/client/findBooks"
        element={
          <FindBooks
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          client={client}
          setClient={setClient}
          />
        }
        />
      </Routes>
    </Router>
  );
}

export default App;
