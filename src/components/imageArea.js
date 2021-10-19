import React, {useCallback} from 'react';
// import {storage} from "../../firebase/index"
import {storage} from "../service/firebase"
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
// import {useDispatch} from "react-redux";
// import {showLoadingAction, hideLoadingAction} from "../../reducks/loading/actions";
import ImagePreview from "./ImagePreview";
import { flexbox } from '@material-ui/system';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

// const useStyles = makeStyles({
//     icon: {
//         marginRight: 8,
//         height: 48,
//         width: 48
//     },
//     preimage: {
//         width: "30%",
//         height:"30%"
//     },
// })

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    //   backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 500,
      height: 150,
    },
  }));

const ImageArea = (props) => {
    const classes = useStyles();
    // const dispatch = useDispatch();
    const images = props.images;

    // const deleteImage = useCallback(async (id) => {
    //     const ret = window.confirm('この画像を削除しますか？')
    //     if (!ret) {
    //         return false
    //     } else {
    //         const newImages = images.filter(image => image.id !== id)
    //         props.setImages(newImages);
    //         return storage.ref('images').child(id).delete()
    //     }
    // }, [images])

    const uploadImage = useCallback((event) => {
        // dispatch(showLoadingAction("uploading..."))
        const file = event.target.files;
        let blob = new Blob(file, { type: "image/jpeg" });

        // Generate random 16 digits strings
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                props.setImages((prevState => [...prevState, newImage]))
                // console.log('images');
                
                // dispatch(hideLoadingAction())
            });
        // }).catch(() => {
            // dispatch(hideLoadingAction())
        })
    }, [props.setImages]);

    return (
        <div>
            <div className={classes.root}>
                <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                    {images.map((image) => (
                    <ImageListItem key={image.id} cols={image.cols || 1}>
                        <img src={image.path} alt={image.path} />
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>
            
            {/* <div>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {images.map((image) => (
                    <ImageListItem key={image.id}>
                    <img
                        src={`${image.path}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${image.path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        // alt={image.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
                </ImageList>
            </div> */}
            {/* <div className="p-grid__list-images"> */}
            
            <div className="u-text-right">
                {/* <span>画像を投稿する</span> */}
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className="u-display-none" type="file" id="image" onChange={e => uploadImage(e)}/>
                    </label>
                </IconButton>
            </div>
        </div>
    );
};

export default ImageArea;