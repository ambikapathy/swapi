import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import './App.css';
import { AuthContext } from "./context/auth";
import { useAuth } from "./context/auth";
import Login from './components/login';
import Search from './components/search';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/search" component={Search} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
