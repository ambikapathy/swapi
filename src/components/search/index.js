import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  TextField,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Planets from "./planets";
import Logout from "../logout";

const useStyles = makeStyles({
  searchBox: {
    height: 100,
    fontSize: "3em",
  },
});

function Search(props) {
  const classes = useStyles();
  const isLoggedIn = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchObjects, setSearchObjects] = useState();
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [lpVariant, setLPVariant] = useState("");

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  function makeSearsh(searchTerm) {
    axios
      .get("https://swapi.dev/api/planets/?search=" + searchTerm)
      .then((response) => {
        if (response.status === 200 && response.data.results.length > 0) {
          setSearchObjects(response.data.results);
          setSearchObjects(response.data.results);
          setIsEmpty(false);
          setLPVariant("determinate");
        } else {
          setIsEmpty(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }
  //to make the first request
  !lpVariant && makeSearsh(searchTerm);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" style={{ flex: 1 }}>
            Title
          </Typography>
          <div>
            <Logout/>
          </div>
        </Toolbar>
      </AppBar>
      <LinearProgress variant={lpVariant} value={100} />
      <TextField
        label="Search Planets"
        value={searchTerm}
        onChange={(e) => {
          setLPVariant("indeterminate");
          setSearchTerm(e.target.value);
          makeSearsh(e.target.value);
        }}
        InputProps={{ classes: { input: classes.searchBox } }}
      />
      {isError && <h2>Error!</h2>}
      {!isError && (
        <p>
          {isEmpty ? (
            "Zero Results."
          ) : (
            <Box component="span" m={1}>
              <Planets planets={searchObjects} />
            </Box>
          )}
        </p>
      )}
    </>
  );
}

export default Search;
