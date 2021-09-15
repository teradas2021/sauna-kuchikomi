import firebase from "firebase";
import { db } from "./firebase";
// import { async } from "q";

export const initGet = async() => {
    
    const kuchikomi = await db.collection("kuchikomi")
    .orderBy("createAt", "desc")
    
    return kuchikomi.get().then((snapShot) => {
        let kuchikomis = [];
        snapShot.forEach((doc) => {
            console.log(doc);
            // console.log(doc.date());
            kuchikomis.push({
                id: doc.id,
                content: doc.data().content,
                kind: doc.data().kind,
                lowTemp: doc.data().lowTemp,
            });
        });
        return kuchikomis;
    });
}

// export const initGet = async(uid) => {
    
//     const todo = await db.collection("todo")
//     .orderBy("createAt", "desc")
//     .where("uid", "==", uid);
    
//     return todo.get().then((snapShot) => {
//         let todos = [];
//         snapShot.forEach((doc) => {
//             console.log(doc);
//             // console.log(doc.date());
//             todos.push({
//                 id: doc.id,
//                 content: doc.data().content,
//                 isComplete: doc.data().isComplete,
//             });
//         });
//         return todos;
//     });
// }

export const addKuchikomi = (content,uid,kind,lowTemp) => {
    // Add a new document with a generated id.
    db.collection("kuchikomi").add({
        content: content,
        uid: uid,
        kind: kind,
        lowTemp: lowTemp,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export const todoDelete = (id) => {
    db.collection("kuchikomi").doc(id).delete();
}

export const toggleComplete = async(id) => {
    const todo = await db.collection("todo").doc(id).get();
    return db.collection("todo").doc(id).update({
        isComplete: todo.data().isComplete ? false : true,
    });
}