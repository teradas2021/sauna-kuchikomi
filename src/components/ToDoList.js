import React, { useState, useEffect,　useContext } from "react";
import {ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Checkbox} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import * as Api from "../service/api";
import { signInWithGoogle } from '../service/firebase';
import dig from "object-dig"
import { AuthContext } from "../providers/AuthProvider";
import { makeStyles } from "@material-ui/core";
import imageArea from "./imageArea";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 360,
        margin: 'auto',
    },
    ul: {
        paddingLeft: 0,
        listStyle: 'none',
    },
    list: {
        justifyContent: 'space-between',
    },
}));


const ToDoList = (props) => {
    const classes = useStyles();
    const deleteHandle = (id) => {
        Api.todoDelete(id);
        props.fetch();
    }

    const checkHandle = async(id) => {
        // API経由でisCompleteの値をとる
        await Api.toggleComplete(id);
        props.fetch();
    }
    
    const kuchikomilist = props.kuchikomis.map((kuchikomi) => {
        return (            
            // <li key={todo.id}>{todo.content}<button type="button" onClick={() => deleteHandle(todo.id)}>削除</button></li>
        <ListItem key={kuchikomi.id}>
            {/* <imageArea>

            </imageArea> */}
            <ListItemAvatar>
                {/* <Checkbox name="checkedA" /> */}
                {/* <Checkbox checked={todo.isComplete} onChange={ () => checkHandle(todo.id) } /> */}
            </ListItemAvatar>
            {/* <ListItemText primary={todo.content}/> */}
            <ListItemText primary={kuchikomi.content}/>
            <ListItemText primary={kuchikomi.kind}/>
            <Checkbox checked={kuchikomi.lowTemp}/>
            {/* <Checkbox>
                primary={kuchikomi.lowTemp}
            </Checkbox> */}

            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteHandle(kuchikomi.id)}>
                <DeleteIcon />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
            )
    })
    return (
        <div className={classes.root}>
            <h2>あなたの投稿</h2>
            <ul className={classes.ul}>{kuchikomilist}</ul>
        </div>
    )
}
export default ToDoList;
