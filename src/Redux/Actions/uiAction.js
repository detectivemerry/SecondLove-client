export const clearMessage = () => dispatch => {
    dispatch({
        type : 'CLEAR_MESSAGE',
    })
    
}

export const clearError = () => dispatch => {
    dispatch({
        type : 'CLEAR_ERRORS',
    })
    
}

export const setLoadingUI = () => dispatch => {
    dispatch({
        type : 'LOADING_UI',
    })
}