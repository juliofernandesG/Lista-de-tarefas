import firebase, { database } from "../../firebase"


export const registerUserFirebase = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...
            console.log('register sukses', user);
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log('Register GAGAL', errorCode, errorMessage);
            dispatch({type: 'CHANGE_LOADING', value: false})
            reject(false);
        });
    })

}


export const loginUserFirebase = (data) => (dispatch) => {

    return new Promise((resolve, reject) => {
        
        dispatch({type: 'CHANGE_LOADING', value: true})
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                console.log('Login Sukses', user);
                const dataUser = {
                    email: user.multiFactor.user.email,
                    uid: user.multiFactor.user.uid,
                    emailVerified: user.multiFactor.user.emailVerified,
                }
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: true})
                dispatch({type: 'CHANGE_USER', value: dataUser})
                resolve(dataUser);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log('Login Tidak sukses', errorCode, errorMessage);
                dispatch({type: 'CHANGE_LOADING', value: false});
                dispatch({type: 'CHANGE_ISLOGIN', value: false});
                reject(false)
            })
    })
}



export const addDataToFirebase = (data) => (dispatch) => {
    database.ref('todo/' + data.userId).push({
        title : data.title,
        tanggal : data.tanggal,
        waktuStart : data.waktuStart,
        waktuFinish : data.waktuFinish,
        keterangan : data.keterangan,
        status: "Incomplete",
        date: data.date
      })
}

export const logOut  = () => (dispatch) => {
    return new Promise((resolve, reject) =>{
        dispatch({type: 'CHANGE_ISLOGIN', value: false})
        resolve(true)
    })
}


export const getDataFromFirebase = (userId) => (dispatch) => {
    const url =  database.ref('todo/' + userId);

    new Promise((resolve, reject) => {
        url.on('value', (snapshot) => {
            // const data = snapshot.val();
            // updateStarCount(postElement, data);
            console.log('getData ->', snapshot.val())
            const data = [];
            if(snapshot.val()){
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id: key,
                        data: snapshot.val()[key]
                    })
                });
            } else {
                return data;
            }

            dispatch({type : 'SET_TODO', value: data})
            resolve(snapshot.val())
            })
    })
}

export const updateDataFirebase = (data) => (dispatch) => {
    const url =  database.ref(`todo/${data.userId}/${data.todoId}`);
    new Promise((resolve, reject) => {
        url.update({
            title : data.title,
            tanggal : data.tanggal,
            waktuStart : data.waktuStart,
            waktuFinish : data.waktuFinish,
            keterangan : data.keterangan,
            status: data.status,
            date: data.date
        }, (err) =>{
            if(err){
                reject(false);
            } else {
                resolve(true);
            }
        })
    })

}

export const deleteDataFirebase = (data) => (dispatch) => {
    const url =  database.ref(`todo/${data.userId}/${data.todoId}`);
    new Promise((resolve, reject) => {
        url.remove();
    })
}



export const updateStatusFirebase = (data) => (dispatch) => {
    const url =  database.ref(`todo/${data.userId}/${data.todoId}`);
    new Promise((resolve, reject) => {
        url.update({
            status: 'Complete',
        }, (err) =>{
            if(err){
                reject(false);
            } else {
                resolve(true);
            }
        })
    })
}


