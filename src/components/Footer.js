import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import { unstable_UserBlockingPriority } from "scheduler";

const unStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: "56",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFF",
        backgroundColor: "#3f51b5",
        position: "fixed",
        bottom: 0,
    },
}));

const Footer = () => {
    const classes = unStyles();
    return(
        <Box className={classes.root} >copyright てらだず</Box>

    )
};
export default Footer;