import React from "react";
import { Button } from "@material-ui/core";

function Logout(props) {
  function logOut() {
    localStorage.clear();
    window.location.href = '/';
  }

  return <Button onClick={logOut}>Log out</Button>;
}

export default Logout;
