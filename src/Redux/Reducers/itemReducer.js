const initState = {
    items : [],
    selectedItem : [],
    collectionPoints : [],
    requestList : [],
    donationList : [],
    searchKeyword : '',
    searchList : [],
    unApprovedItemList : [],
    ballotItemList : [],
    loading : false
}

const itemReducers = (state = initState, action) => {

    switch(action.type){
        case 'GET_ITEMS':
            return{
                ...state,
                items: action.payload,
                loading : false
            }

        case 'GET_ITEM':
            return{
                ...state,
                selectedItem : action.payload,
                loading : false
            }
        
        case 'GET_COLLECTION_POINTS':
            return{
                ...state,
                collectionPoints : action.payload
            }
        case 'GET_UNAPPROVED_ITEM_LIST':
            return{
                ...state,
                unApprovedItemList : action.payload,
                loading : false
            }
        case 'REMOVE_FROM_UNAPPROVED_ITEM_LIST':
            return {
                ...state,
                unApprovedItemList : state.unApprovedItemList.filter(item => item.itemId !== action.payload)
            }
        case 'GET_BALLOT_ITEM_LIST':
            return{
                ...state,
                ballotItemList : action.payload,
                loading : false
            }
        case 'REMOVE_FROM_BALLOT_ITEM_LIST':
            return {
                ...state,
                ballotItemList : state.ballotItemList.filter(item => item.itemId !== action.payload)
            }
        case 'CLEAR_SELECTED_ITEM':
            return{
                ...state,
                selectedItem : []
            }
        case 'SET_REQUEST_LIST':
            return{
                ...state,
                loading: false,
                requestList : action.payload
            }

        case 'SET_DONATION_LIST':
            return{
                ...state,
                loading: false,
                donationList : action.payload
            }

        case 'SET_ITEM_REDUCER_INIT' :
            return {
                items : [],
                selectedItem : [],
                collectionPoints : [],
                requestList : [],
                donationList : []
            }

        case 'SET_SEARCH_KEYWORD' : 
            return {
                ...state,
                searchKeyword : action.payload
            }

        case 'LOADING_ITEMS':
            return {
                ...state,
                loading: true
            };
        case 'CLEAR_LOADING':
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
export default itemReducers;