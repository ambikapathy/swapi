import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { FormGroup, TextField, Button } from '@material-ui/core';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import swlogo from '../../assets/star-wars-logo.jpg'
import { useAuth } from "../../context/auth";
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 375,
        margin: 20
    },
    title: {
        fontSize: 14,
    },
});

function Planets(props) {
    const classes = useStyles();
    return (
        props.planets.map(planet => {
            return (
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            population: {planet.population}
                        </Typography>
                        <Typography variant="h5" component="h2" style={{ fontSize: {...planet.population / 9999}}}>
                            {planet.name}
                        </Typography>
                    </CardContent>
                </Card >
            )
        })
    )
}
export default Planets;