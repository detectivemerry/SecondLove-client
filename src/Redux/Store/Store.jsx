import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../Reducers/RootReducer'

const initialState = {};
const middleWare = [thunk];

function saveToLocalStorage(state){
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }
    catch(e) {
        console.log(e)
    }
}

function loadFromLocalStorage(){
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }
    catch(e){
        console.log(e)
        return undefined
    }
}
const persistedState = loadFromLocalStorage()
//const store = createStore(RootReducer, initialState, compose(applyMiddleware(...middleWare)));

const store = createStore(RootReducer, initialState, compose(applyMiddleware(...middleWare),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

store.subscribe(() => {saveToLocalStorage(store.getState())})

export default store;
