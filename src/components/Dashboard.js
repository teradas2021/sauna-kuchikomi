import React, { useState, useEffect,　useContext, useToggle } from "react";
import * as Api from "../service/api"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox'; 
import { makeStyles } from "@material-ui/styles";
import { signInWithGoogle } from '../service/firebase';
import dig from "object-dig"
import { AuthContext } from "../providers/AuthProvider";
import ToDoList from "./ToDoList"

const useStyles = makeStyles(() => ({
    root: {
        textAlign: 'center',
        marginTop: 40,
    },
    form: {
        width: "100%",
        maxWidth: 360,
        margin: "auto",
        marginBottom: 40,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
    },
    input: {
        marginRight: 10,
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState("");
    const [inputKind, setinputKind] = useState("");
    // const [inputLowTemp, setinputLowTemp] = useToggle("");
    const [inputLowTemp, setinputLowTemp] = useState("");
    const [kuchikomis, setKuchikomis] = useState([]);
    console.log(inputName);
    console.log(inputLowTemp);
        console.log(kuchikomis);

    useEffect(() => {
        //Todo一覧を取得
        fetch();
    }, [currentUser])

    const fetch = async() => {
        if( dig(currentUser, 'currentUser', 'uid')) {
            console.log("OK");
            const uid = currentUser.currentUser.uid;
            console.log(uid);
            const data = await Api.initGet(uid);
            // const data = await Api.initGet(currentUser.currentUser.uid);
            
            await setKuchikomis(data);
            console.log(data);
        }
    }

    const formRender = () => {
        let dom
        if( dig(currentUser, 'currentUser', 'uid')){
            dom = <form className={classes.form}>
                <TextField placeholder = "お店の名前" className={classes.input} value={inputName} onChange={(event) => setInputName(event.currentTarget.value)}/>
                <TextField placeholder = "種類" className={classes.input} value={inputKind} onChange={(event) => setinputKind(event.currentTarget.value)}/>
                <Checkbox onChange={ () => setinputLowTemp(prevState => !prevState) } />
                
                <Button variant="contained" color='primary' size='small'
                disabled={inputName.length > 0 ? false : true}
                type="button" onClick={() => post()}>追加</Button>
            </form>

        }else{
            dom = <button onClick={signInWithGoogle}>Googleログイン</button>
        }
        return dom
    }

    const post = async() => {
        console.log(inputLowTemp);
        await Api.addKuchikomi(inputName, currentUser.currentUser.uid, inputKind, inputLowTemp);
        
        await setInputName("");
        await setinputKind("");        
        fetch();
    }

    return(
        <div className={classes.root}>
            {formRender()}
            <ToDoList kuchikomis={kuchikomis} fetch={fetch} />
        </div>
    )
};
export default Dashboard;