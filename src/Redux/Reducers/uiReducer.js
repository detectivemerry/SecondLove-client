
const initialState = {
    loading: false,
    errors: '',
    message : '',
    newMessage : false,
    newError : false,
    uploadImgLink : ''
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case 'SET_ERRORS':
        return {
          ...state,
          loading: false,
          errors: action.payload,
          newError:true
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          loading: false,
          errors: '',
          newError:false
        };
      case 'LOADING_UI':
        return {
          ...state,
          loading: true
        };
      case 'CLEAR_LOADING_UI':
        return {
          ...state,
          loading:false
        }
        case 'SET_MESSAGE':
          return {
            ...state,
            message : action.payload,
            newMessage : true
          }
        case 'CLEAR_MESSAGE' :
          return {
            ...state,
            message : "",
            newMessage : false
          }
          case 'SET_UPLOAD_IMG_LINK':
          return {
            ...state,
            uploadImgLink : action.payload
          }

          case 'CLEAR_UPLOAD_IMG_LINK' :
          return {
            ...state,
            uploadImgLink : "",
          }

          
      default:
        return state;
    }
  }