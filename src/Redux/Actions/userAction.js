export const loginUser = (userData, history) => dispatch => {
     fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/login',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then((data) => {  
            const FBIdToken = `Bearer ${data.token}`
            localStorage.setItem('FBIdToken', `Bearer ${data.token}`)
            dispatch(getUserData());
            dispatch({type : 'CLEAR_ERRORS'})
            history.push('/')
        })
        .catch((err) => {
            console.log(err)
            err.json().then((body)=>{
                dispatch({
                    type : 'SET_ERRORS',
                    payload : body
                })
            })
        });
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: 'LOADING_USER' });
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/user',{
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : localStorage.FBIdToken
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.credentials.isAdmin){
            dispatch({
                type: 'SET_ADMIN',
                payload: data
              });
        }
        else{
            dispatch({
                type: 'SET_USER',
                payload: data
              });
        }
      })
      .catch((err) => console.log(err));
  }
  
export const registerUser = (userData, history) => dispatch => {
    fetch('https://us-central1-secondlove-cc51b.cloudfunctions.net/api/signup',{
        method: 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((res) => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then((data) => {  
            const FBIdToken = `Bearer ${data.token}`
            localStorage.setItem('FBIdToken', `Bearer ${data.token}`)
            dispatch({type : 'CLEAR_ERRORS'})
            history.push('/')    
        })
        .catch((err) => {
            console.log(err)
            err.json().then((body)=>{
                dispatch({
                    type : 'SET_ERRORS',
                    payload : body
                })
            })
        });
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('FBIdToken');
    dispatch({ type: 'SET_UNAUTHENTICATED' });
    dispatch({type : 'LOG_OUT'})
}