const initState = {
    authenticated : false,
    loading:false,
    isAdmin:false,
    credentials : {},
    requests : [],
    notifications : []
}

const userReducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_AUTHENTICATED': 
            return{
                ...state,
                authenticated : true
            }

        case 'SET_UNAUTHENTICATED':
            return initState

        case 'SET_USER':
            return{
                ...state,
                isAdmin:false,
                authenticated : true,
                loading : false,
                ...action.payload
            }

        case 'SET_ADMIN':
        return{
            ...state,
            authenticated : true,
            loading : false,
            isAdmin : true,
            ...action.payload
        }

        case 'LOADING_USER':
            return {
                ...state,
                loading: true
            };

        case 'LOG_OUT' :
            return {
                ...initState
            }
        default:
            return state;
    }
}
export default userReducer;