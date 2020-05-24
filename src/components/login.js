import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { FormGroup, TextField, Button } from '@material-ui/core';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import swlogo from '../assets/star-wars-logo.jpg'
import { useAuth } from "../context/auth";
import axios from 'axios';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

function Login() {
    const classes = useStyles();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const isAuthenticated = useAuth();
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function makeLogin() {
        axios.get("https://swapi.dev/api/people/?name=" + userName + "&birth_date=" + password).then(response => {
            let swObject = response.data.results.filter(function (el) { return el.name == "Luke Skywalker" && el.birth_year == "19BBY" });
            if (response.status === 200 && swObject.length > 0) {
                setAuthTokens(swObject);
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }

    if (isLoggedIn && isAuthenticated) {
        return <Redirect to="/search" />;
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={swlogo}
                        title="STAR WARS"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Login
                            </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">

                            <FormGroup>
                                <TextField label="Username" value={userName}
                                    onChange={e => {
                                        setUserName(e.target.value);
                                    }} />
                                <TextField type="Password" label="Password" value={password} onChange={e => {
                                    setPassword(e.target.value);
                                }} />
                                <Button onClick={makeLogin}>Enter</Button>
                            </FormGroup>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card></Box>
    )
}
export default Login;
