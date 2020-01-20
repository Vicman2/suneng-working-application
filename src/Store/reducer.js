import * as actionType from './actions'

const initialStore = {
    isLoggedIn: false, 
    userData: {}, 
    products: null, 
    preOrdered: false,
    orderedProduct:{},
    page: "home"
}


const reducer = (state = initialStore, action) => {
    switch(action.type){
        case actionType.LOGMEIN:
            return{
                ...state,
                isLoggedIn : true, 
                userData: action.payload
            }
        case actionType.GET_PRODUCTS:
            return {
                ...state, 
                products: action.payload
            }
        case actionType.SET_ORDERED_PRODUCT:
            return{
                ...state,
                orderedProduct: action.payload
            }
        case actionType.SET_PRE_ORDERED:
            return{
                ...state, 
                preOrdered : true,
                orderedProduct: action.payload
            }
        case actionType.CANCEL_PRE_ORDERD:
            return{
                ...state, 
                preOrdered:false,
                orderedProduct:{}
            }
        case actionType.NAVIGATE:
            return{
                ...state,
                page: action.page
            }
    }
    return state;
}

export default reducer