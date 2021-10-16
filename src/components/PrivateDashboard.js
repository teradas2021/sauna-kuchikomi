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
import PrivateList from "./PrivateList";
import ImageArea from "./imageArea";
import Grid from '@material-ui/core/Grid';

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
    },
    postbutton: {
        marginTop:40
    }
}));

const PrivateDashboard = () => {
    const classes = useStyles();
    const currentUser = useContext(AuthContext);
    const [inputName, setInputName] = useState("");
    const [inputKind, setinputKind] = useState("");
    // const [inputLowTemp, setinputLowTemp] = useToggle("");
    const [inputLowTemp, setinputLowTemp] = useState("");
    const [kuchikomis, setKuchikomis] = useState([]);
    const [images, setImages] = useState([]);
    console.log(inputName);
    console.log(inputLowTemp);
    console.log(kuchikomis);
    console.log(dig(currentUser, 'currentUser', 'uid'));
    console.log(images);
    
    

    useEffect(() => {
        //Todo一覧を取得
        privateFetch();
    }, [currentUser])

    const privateFetch = async() => {
        console.log('privateFetchだよ');
        
        if( dig(currentUser, 'currentUser', 'uid')) {
            console.log("OK");
            const uid = currentUser.currentUser.uid;
            console.log(uid);
            const data = await Api.privateInitGet(uid);
            // const data = await Api.initGet(currentUser.currentUser.uid);
            
            await setKuchikomis(data);
            console.log(data);
        }
    }

    const formRender = () => {
        let dom
        // console.log(dig(currentUser, 'currentUser', 'uid'));
        
        if( dig(currentUser, 'currentUser', 'uid')){
            dom = <form className={classes.form}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField placeholder = "お店の名前" className={classes.input} value={inputName} onChange={(event) => setInputName(event.currentTarget.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField placeholder = "種類" className={classes.input} value={inputKind} onChange={(event) => setinputKind(event.currentTarget.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <h3>タオル備え付け
                        <Checkbox onChange={ () => setinputLowTemp(prevState => !prevState) } />
                        </h3>
                    </Grid>
                    <Grid item xs={12}>
                        <ImageArea images={images} setImages={setImages} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className={classes.postbutton}
                        variant="contained" color='primary' size='small'
                        disabled={inputName.length > 0 ? false : true}
                        type="button" onClick={() => post()}>追加</Button>
                    </Grid>
                    
                </Grid>
                
            </form>

        }else{
            console.log("エラーだよ");
            dom = <button onClick={signInWithGoogle}>Googleログイン</button>
        }
        return dom
    }

    const post = async() => {
        console.log(inputLowTemp);
        await Api.addKuchikomi(inputName, currentUser.currentUser.uid, inputKind, inputLowTemp, images);
        
        await setInputName("");
        await setinputKind("");        
        privateFetch();
    }

    return(
        <div className={classes.root}>
            {/* <ImageArea images={images} setImages={setImages} /> */}
            {formRender()}
            <PrivateList kuchikomis={kuchikomis} fetch={privateFetch} />
        </div>
    )
};
export default PrivateDashboard;